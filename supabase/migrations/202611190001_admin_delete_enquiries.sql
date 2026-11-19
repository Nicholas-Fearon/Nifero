-- Existing enquiry admins may delete individual enquiries using their own session.
-- Public visitors and other signed-in users gain no access to enquiry records.
begin;

grant delete on public.enquiries to authenticated;

create policy "Admins can delete enquiries"
  on public.enquiries for delete to authenticated
  using (exists (
    select 1 from public.enquiry_admins where user_id = (select auth.uid())
  ));

commit;
