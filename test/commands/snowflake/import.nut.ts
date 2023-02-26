import { execCmd, TestSession } from '@salesforce/cli-plugins-testkit';
import { expect } from 'chai';
import { SnowflakeImportResult } from '../../../src/commands/snowflake/import';

let testSession: TestSession;

describe('hello world NUTs', () => {
  before('prepare session', async () => {
    testSession = await TestSession.create();
  });

  after(async () => {
    await testSession?.clean();
  });

  it('should import Snowflake', () => {
    const { result } = execCmd<SnowflakeImportResult>('snowflake import -a Account -u User -s Contact -m Upsert -e Id -q ./data.sql -o org --json', { ensureExitCode: 0 }).jsonOutput;
    expect(result.username).to.equal('mattnewell');
  });

  it('should say snowflake to a given person', () => {
    const { result } = execCmd<SnowflakeImportResult>('snowflake import --name Astro --json', {
      ensureExitCode: 0,
    }).jsonOutput;
    expect(result.account).to.equal('Account');
  });
});

// snowflake import -a Neweller -u Dude -s Contact -m Upsert -e Id -q ./package.json -o newellerOrg
// snowflake import -a Account -u User -s Contact -m Upsert -e Id -q ./data.sql -o org