const onUpdateTimestampFunction = `
  CREATE OR REPLACE FUNCTION on_update_timestamp()
  RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
  $$ language 'plpgsql';
`;

const dropOnUpdateTimestampFunction = `
  DROP FUNCTION on_update_timestamp
`;

exports.up = (knex) => {
  return knex.raw(onUpdateTimestampFunction);
};

exports.down = (knex) => {
  return knex.raw(dropOnUpdateTimestampFunction);
};
