import {  TestSession } from '@salesforce/cli-plugins-testkit';
// import {SnowflakeImportResults} from '../../../src/commands/types';
// import { expect } from 'chai';

let testSession: TestSession;

describe('hello world NUTs', () => {
  before('prepare session', async () => {
    // rely on defaultusername
    // { executable: 'sfdx', config: 'config/project-scratch-def.json', setDefault: true },

    testSession = await TestSession.create({
      project: {
        name: 'Snarf-Plugin',
      },
      scratchOrgs: [
        { executable: 'sfdx', setDefault: true }
      ]
    });
  });

  after(async () => {
    // await testSession?.clean();
  });

  it('should import Snowflake', () => {
    const username = [...testSession.orgs.keys()][0];
    console.log(username);
    // const {result} = execCmd<SnowflakeImportResult>(`snowflake import -a Account -u mattnewell -s Contact -m Upsert -e Id -q ./data.sql -o ${username} --json`, { ensureExitCode: 0 }).jsonOutput;
    // expect(result.username).to.equal('mattnewell');
  });

  it('should say snowflake to a given person', () => {
    // const { result } = execCmd<SnowflakeImportResult>('.bin/dev snowflake import --name Astro --json', {
    //   ensureExitCode: 0,
    // }).jsonOutput;
    // expect(result.account).to.equal('Account');
  });
});

// snowflake import -a Neweller -u Dude -s Contact -m Upsert -e Id -q ./package.json -o newellerOrg
// snowflake import -a Account -u User -s Contact -m Upsert -e Id -q ./data.sql -o org