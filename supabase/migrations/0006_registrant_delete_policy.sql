create policy "staff delete registrants" on registrants
  for delete to authenticated
  using (true);
