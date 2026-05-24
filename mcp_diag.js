import fs from 'node:fs';
import path from 'node:path';

const mcpPath = path.join(process.env.HOME, 'Library/Application Support/Code/User/mcp.json');
const logPath = '/Users/kristofferohnstadhjelmeland/.npm/_logs/2026-05-20T12_15_41_260Z-debug-0.log';

function redact(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/(?:(?::|\/\/)|\?|&|\b(auth|token|key|secret|pass|pwd|authorization)=)([^\s&\/]+)/gi, (m, p1) => p1 ? p1 + '=REDACTED' : m);
}

function sanitize(str) {
    return redact(str).replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}/g, '[EMAIL]');
}

console.log('--- MCP JSON Diagnostics ---');
if (!fs.existsSync(mcpPath)) {
    console.log('mcp.json does not exist at ' + mcpPath);
} else {
    try {
        const content = fs.readFileSync(mcpPath, 'utf8');
        const config = JSON.parse(content);
        console.log('JSON.parse: OK');
        console.log('Top-level keys: ' + Object.keys(config).join(', '));

        if (config.servers) {
            console.log('Servers:');
            for (const [name, server] of Object.entries(config.servers)) {
                const command = server.command || '';
                const args = server.args || [];
                console.log('- Name: ' + name);
                console.log('  Type: ' + (server.runtime || 'spawn'));
                console.log('  Command: ' + command);
                console.log('  Args count: ' + args.length);
                console.log('  First 3 args: ' + JSON.stringify(args.slice(0, 3).map(a => redact(a))));

                if (command.includes(' ')) {
                    console.log('  [FLAG] Command contains spaces');
                }
                if (command === 'npx') {
                    if (args.length === 0) {
                        console.log('  [FLAG] npx command with no args');
                    } else if (!/^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(args[0]) && !args[0].startsWith('-')) {
                    console.log('  [FLAG] First arg for npx might not be a package');
                    }
                }
            }
        }
    } catch (e) {
        console.log('JSON.parse: ERROR - ' + e.message);
    }
}

console.log('\n--- NPM Log Diagnostics ---');
if (fs.existsSync(logPath)) {
    console.log('Log file exists: ' + logPath);
    const logLines = fs.readFileSync(logPath, 'utf8').split('\n');
    const keywords = ['verbose cli', 'error enoent', 'error path', 'error syscall', 'error code', 'cwd', 'stack'];
    logLines.forEach(line => {
        const lowerLine = line.toLowerCase();
        if (keywords.some(k => lowerLine.includes(k))) {
            console.log(sanitize(line));
        }
    });
} else {
    console.log('Log file does not exist: ' + logPath);
}
