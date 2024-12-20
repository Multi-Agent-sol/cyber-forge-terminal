export interface CommandResult {
  output: string;
  error?: boolean;
  isAI?: boolean;
}

const fileSystem: { [key: string]: string | { [key: string]: string } } = {
  'home': {
    'documents': {
      'readme.txt': 'Welcome to CyberForge Terminal\nA next-generation command interface.',
      'project_x.log': 'Project X Log: [REDACTED]',
    },
    'system': {
      'config.ini': '[ENCRYPTED]',
    },
  },
};

let currentDirectory = '/home';

export const executeCommand = (command: string): CommandResult => {
  const parts = command.split(' ');
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  const handlers: { [key: string]: (args: string[]) => CommandResult } = {
    help: () => ({
      output: `
Available commands:
  cyber-agent       - Start Cyber Agent chat mode
  help              - Show this help message
  clear             - Clear the terminal
  echo <message>    - Display a message
  ls                - List files and directories
  cd <dir>          - Change directory
  cat <file>        - Display file contents
  pwd               - Print working directory
  mkdir <dir>       - Create a new directory
  rm <file/dir>     - Remove a file or directory
  touch <file>      - Create a new file
  date              - Show current date and time
  hack <target>     - Attempt to hack a target system
`.trim()
    }),
    clear: () => ({ output: '' }),
    echo: (args) => ({ output: args.join(' ') }),
    ls: () => {
      const currentDir = getCurrentDir();
      if (typeof currentDir === 'object') {
        return { output: Object.keys(currentDir).join('\n') };
      }
      return { output: 'Unable to list directory contents', error: true };
    },
    cd: (args) => {
      if (args.length === 0) {
        currentDirectory = '/home';
        return { output: '' };
      }
      const newPath = resolvePath(args[0]);
      const newDir = getDir(newPath);
      if (newDir && typeof newDir === 'object') {
        currentDirectory = newPath;
        return { output: '' };
      }
      return { output: `cd: ${args[0]}: No such directory`, error: true };
    },
    cat: (args) => {
      if (args.length === 0) return { output: 'Usage: cat <filename>', error: true };
      const file = getCurrentDir()[args[0]];
      if (typeof file === 'string') {
        return { output: file };
      }
      return { output: `cat: ${args[0]}: No such file`, error: true };
    },
    pwd: () => ({ output: currentDirectory }),
    mkdir: (args) => {
      if (args.length === 0) return { output: 'Usage: mkdir <directory>', error: true };
      const currentDir = getCurrentDir();
      if (typeof currentDir === 'object') {
        currentDir[args[0]] = {};
        return { output: `Directory created: ${args[0]}` };
      }
      return { output: 'Unable to create directory', error: true };
    },
    rm: (args) => {
      if (args.length === 0) return { output: 'Usage: rm <file/directory>', error: true };
      const currentDir = getCurrentDir();
      if (typeof currentDir === 'object' && args[0] in currentDir) {
        delete currentDir[args[0]];
        return { output: `Removed: ${args[0]}` };
      }
      return { output: `rm: ${args[0]}: No such file or directory`, error: true };
    },
    touch: (args) => {
      if (args.length === 0) return { output: 'Usage: touch <filename>', error: true };
      const currentDir = getCurrentDir();
      if (typeof currentDir === 'object') {
        currentDir[args[0]] = '';
        return { output: `File created: ${args[0]}` };
      }
      return { output: 'Unable to create file', error: true };
    },
    date: () => ({ output: new Date().toString() }),
  };

  if (handlers[cmd]) {
    return handlers[cmd](args);
  }

  return {
    output: `Command not found: ${cmd}. Type 'help' for available commands.`,
    error: true
  };
};

function getCurrentDir(): { [key: string]: string | object } {
  return currentDirectory.split('/').reduce((acc: any, curr) => {
    return acc[curr];
  }, fileSystem);
}

function resolvePath(path: string): string {
  if (path.startsWith('/')) return path;
  const current = currentDirectory.split('/');
  const parts = path.split('/');
  for (const part of parts) {
    if (part === '..') {
      current.pop();
    } else if (part !== '.') {
      current.push(part);
    }
  }
  return '/' + current.filter(Boolean).join('/');
}

function getDir(path: string): { [key: string]: string | object } | null {
  return path.split('/').reduce((acc: any, curr) => {
    return acc && acc[curr];
  }, fileSystem);
}

