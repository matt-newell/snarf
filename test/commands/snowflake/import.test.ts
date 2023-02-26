import { expect, test } from '@oclif/test';
import { SnowflakeImportResult } from '../../../src/commands/snowflake/import';

describe('hello world', () => {
  // test
  //   .stdout()
  //   .command(['snowflake:import'])
  //   .it('runs snowflake import with no provided name', (ctx) => {
  //     expect(ctx.stdout).to.contain('Hello World');
  //   });

  // test
  //   .stdout()
  //   .command(['snowflake:import', '--json'])
  //   .it('runs snowflake import with --json and no provided name', (ctx) => {
  //     const { result } = JSON.parse(ctx.stdout) as { result: SnowflakeImportResult };
  //     expect(result.account).to.equal('Account');
  //   });

  test
    .stdout()
    .command(['snowflake:import', '-a', 'Account', '--username', 'mattnewell', '-o', 'org', '--json'])
    .it('runs snowflake import --name Astro --json', (ctx) => {
      const { result } = JSON.parse(ctx.stdout) as { result: SnowflakeImportResult };
      expect(result.username).to.equal('mattnewell');
    });
});
