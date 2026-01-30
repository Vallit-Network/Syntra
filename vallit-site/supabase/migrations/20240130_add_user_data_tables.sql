-- Create appointments table if it doesn't exist
create table if not exists appointments (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    email text not null,
    company text,
    date timestamp with time zone not null,
    topic text,
    custom_field text
);
-- Create chat_sessions table
create table if not exists chat_sessions (
    session_id text primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_email text,
    -- Optional, populated if we can link it
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Create chat_messages table
create table if not exists chat_messages (
    id uuid default gen_random_uuid() primary key,
    session_id text not null references chat_sessions(session_id) on delete cascade,
    role text not null check (role in ('user', 'assistant', 'system')),
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    metadata jsonb
);
-- Create contact_entries table
create table if not exists contact_entries (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    company text not null,
    email text not null,
    team_size text,
    interest text,
    message text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Create data_requests table for GDPR requests
create table if not exists data_requests (
    request_id uuid default gen_random_uuid() primary key,
    email text not null,
    request_type text not null check (request_type in ('ACCESS', 'DELETE')),
    status text not null default 'PENDING' check (status in ('PENDING', 'COMPLETED', 'FAILED')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    completed_at timestamp with time zone
);
-- Enable RLS on all tables
alter table appointments enable row level security;
alter table chat_sessions enable row level security;
alter table chat_messages enable row level security;
alter table data_requests enable row level security;
alter table contact_entries enable row level security;
-- Create policies (safe idempotency: drop if exists first)
drop policy if exists "Allow public insert for appointments" on appointments;
create policy "Allow public insert for appointments" on appointments for
insert with check (true);
drop policy if exists "Allow public insert for chat_sessions" on chat_sessions;
create policy "Allow public insert for chat_sessions" on chat_sessions for
insert with check (true);
drop policy if exists "Allow public insert for chat_messages" on chat_messages;
create policy "Allow public insert for chat_messages" on chat_messages for
insert with check (true);
drop policy if exists "Allow public insert for data_requests" on data_requests;
create policy "Allow public insert for data_requests" on data_requests for
insert with check (true);
drop policy if exists "Allow public insert for contact_entries" on contact_entries;
create policy "Allow public insert for contact_entries" on contact_entries for
insert with check (true);
-- Allow service role full access (implicitly true, but explicit for clarity if needed later)
-- Readers: Only admin/service role should read these generally.