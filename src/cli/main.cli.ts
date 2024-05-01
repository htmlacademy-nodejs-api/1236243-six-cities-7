#!/usr/bin/env node
import { CLIApplication } from './cli-aplication.js';
import { ImportCommand } from './commands/import.command.js';
import { HelpCommand, VersionCommand} from './index.js';


function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new VersionCommand(),
    new HelpCommand(),
    new ImportCommand()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
