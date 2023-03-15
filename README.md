This is a fork of [saffron](https://github.com/cloudflare/saffron), a cron parser used as part of
the backend for Cron Triggers in Cloudflare Workers.

It has been updated to

- **use 0 for Sunday, 1 for Monday etc.** instead of 1 for Sunday, 2 for Monday
- use a more recent version of nom
- use a more recent Rust toolchain
