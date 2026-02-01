// Cloudflare Pages Function for LLM API Proxy
// 替代Cloudflare Workers的简单方案

export async function onRequestPost(context) {
  try {
    const { provider, apiKey, prompt, model, max_tokens = 100, temperature = 0.1 } = await context.request.json();

    if (!provider || !apiKey || !prompt) {
      return Response.json({
        error: 'Missing required fields: provider, apiKey, prompt'
      }, {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    let apiUrl, headers, body;

    switch (provider.toLowerCase()) {
      case 'nvidia':
        apiUrl = 'https://integrate.api.nvidia.com/v1/chat/completions';
        headers = {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        };
        body = JSON.stringify({
          model: model || 'meta/llama-3.1-8b-instruct',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: max_tokens,
          temperature: temperature,
          top_p: 1,
          stream: false
        });
        break;

      case 'openrouter':
        apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
        headers = {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://monopoly-bookkeeper.pages.dev',
          'X-Title': 'Monopoly Voice Correction'
        };
        body = JSON.stringify({
          model: model || 'anthropic/claude-3-haiku:beta',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: max_tokens,
          temperature: temperature
        });
        break;

      case 'anthropic':
        apiUrl = 'https://api.anthropic.com/v1/messages';
        headers = {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        };
        body = JSON.stringify({
          model: model || 'claude-3-haiku-20240307',
          max_tokens: max_tokens,
          messages: [{ role: 'user', content: prompt }],
          temperature: temperature
        });
        break;

      case 'openai':
        apiUrl = 'https://api.openai.com/v1/chat/completions';
        headers = {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        };
        body = JSON.stringify({
          model: model || 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: max_tokens,
          temperature: temperature
        });
        break;

      default:
        return Response.json({
          error: `Unsupported provider: ${provider}`
        }, {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        });
    }

    // 发送请求到LLM提供商
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: body
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`LLM API error for ${provider}:`, response.status, errorText);

      return Response.json({
        error: `${provider} API error: ${response.status}`,
        details: errorText
      }, {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const result = await response.json();

    // 统一响应格式
    let content = '';
    if (provider === 'anthropic') {
      content = result.content?.[0]?.text || '';
    } else {
      content = result.choices?.[0]?.message?.content || '';
    }

    return Response.json({
      content: content,
      provider: provider,
      usage: result.usage || null
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Function error:', error);

    return Response.json({
      error: 'Internal server error',
      details: error.message
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    }
  });
}