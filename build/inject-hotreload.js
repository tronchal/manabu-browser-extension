export function injectHotReload(html, port) {
    return html.replace('</body>', `
        <script>
            (() => {
            const socket = new WebSocket('ws://localhost:${port}');
            socket.onopen = () => {
                console.log('[Hot Reload] Connected to server');
            };
            socket.onmessage = (event) => {
                if (event.data === 'reload') {
                console.log('[Hot Reload] Reloading page...');
                location.reload();
                }
            };
            socket.onclose = () => {
                console.log('[Hot Reload] Disconnected from server');
                // Try to reconnect
                setTimeout(() => {
                window.location.reload();
                }, 1000);
            };
            })();
        </script>
    </body>
    `);
}
