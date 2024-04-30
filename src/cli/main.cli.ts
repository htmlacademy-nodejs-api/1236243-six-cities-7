import { CLIApplication } from './cli-aplication.js';
import { HelpCommand, VersionCommand} from './index.js';


function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new VersionCommand(),
    new HelpCommand()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
