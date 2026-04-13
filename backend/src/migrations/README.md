# Migrations

## Info

- Runs the migrations in numeric ascending order, a table to the database called
  `schema-history` will be created containing the migrations that have ran

## Format

Must be formatted like `V1__insert_example.sql` where `1` is the number of the current migration, all migrations
before this number will run before it, `__` is just for visibility, can also be `_` if mistake is made but
try to make it `__` and `.sql` at end to indicate its an `sql` file
