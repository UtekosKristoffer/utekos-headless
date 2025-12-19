export function ConnectionAiScript() {
  return (
    <>
      <script type='text/javascript'>
        {`window.xrayDataLayer = window.xrayDataLayer || [];
function xrayData() { xrayDataLayer.push(arguments); }`}
      </script>
      <script async src='https://cdn.connection.ai/js/xray.js'></script>
    </>
  )
}
