type ParsedCommand = Record<string, string[]>;

export class CommandParser {
  static parse (cliArguments: string[]): ParsedCommand {
    const parseCommand: ParsedCommand = {};
    let currentCommand = '';

    for (const argument of cliArguments) {
      if(argument.startsWith('--')) {
        parseCommand[argument] = [];
        currentCommand = argument;
      } else if (currentCommand && argument) {
        parseCommand[currentCommand].push(argument);
      }
    }

    return parseCommand;
  }
}
