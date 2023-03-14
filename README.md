# S.N.A.R.F.
### Salesforce Network Access Record Finder
[![NPM](https://img.shields.io/npm/v/snarf.svg?label=snarf)](https://www.npmjs.com/package/snarf) [![Downloads/week](https://img.shields.io/npm/dw/snarf.svg)](https://npmjs.org/package/snarf) [![License](https://img.shields.io/badge/License-BSD%203--Clause-brightgreen.svg)](https://raw.githubusercontent.com/salesforcecli/snarf/main/LICENSE.txt)

<p align="center" width="250">
    <img float="right" max-width="250" width="250" height="315" src="https://raw.githubusercontent.com/matt-newell/snarf/main/assets/snarf.png?raw=true&h=312&w=250&fit=crop&align=center"> 
</p>

## Commands

<!-- commands -->

- [`sf snarf snowflake query`](#snarf-snowflake-query)
## `snarf snowflake query`
```
Snowflake ❄️ > Query 🔎

USAGE
  $ sf snowflake query -a <value> -u <value> [--json] [-q <value>]

FLAGS
  -a, --account=<value>   (required) The Account for Snowflake ❄️
  -q, --query=<value>     The query of the data you'd like to sync ❄️.
  -u, --username=<value>  (required) The Username for Snowflake ❄️

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Snowflake ❄️ > Query 🔎

  snowflake query
  • Account
  • User
  • Query

EXAMPLES
  snowflake query -a Account -u User -q Query:

    $ sf snowflake query

  Say hello to someone you know:

    $ sf snowflake query -a ${Account} -u ${User} -q ${Query}

```

- [`sf snarf snowflake import`](#sf-snarf-snowflake-import)

## `snarf snowflake import`



```
Snowflake ❄️ > Salesforce ☁️

USAGE
  $ sf snowflake import -o <value> [--json] [-s <value>] [-m <value>] [-e <value>] [-q <value>]

FLAGS
  -a, --account=<value>     (required) The Account for Snowflake ❄️
  -e, --extIdField=<value>  [default: Id] The extIdField of the data you'd like to Upsert ☁️.
  -m, --method=<value>      [default: Upsert] The method of the data you'd like to sync ☁️.
  -o, --target-org=<value>  (required) Username or alias of the target org.
  -q, --query=<value>       The query of the data you'd like to sync ❄️.
  -s, --sobject=<value>     [default: Account] The sobject of the data you'd like to sync .
  -u, --username=<value>    (required) The Username for Snowflake ❄️

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Snowflake ❄️ > Salesforce ☁️

  snowflake
  • clientId
  • oAuth
  • query

  salesforce
  • sObject
  • mode
  • identifier

EXAMPLES
  Import data from Snowflake ❄️ to Salesforce ☁️

  Local dev

    $ ./bin/sf snarf snowflake import -s Contact -m Upsert -e Id -q ./sql/contacts.sql -o devOrg

  Or installed

    $ sf snarf snowflake import -s Contact -m Upsert -e Id -q ./sql/contacts.sql -o devOrg
```

<!-- commandsstop -->
