// import {SnowflakeImportResults} from '../../../src/commands/types';
// import { expect } from 'chai';

describe('hello world NUTs', () => {
  before('prepare session', async () => {});

  after(async () => {
    // await testSession?.clean();
  });

  it('should import Snowflake', () => {
    // const {result} = execCmd<SnowflakeImportResult>(`snowflake import -a Account -u mattnewell -s Contact -m Upsert -e Id -q ./data.sql -o ${username} --json`, { ensureExitCode: 0 }).jsonOutput;
    // expect(result.username).to.equal('mattnewell');
  });

});

// snowflake query -a Neweller -u Dude -q ./data.sql