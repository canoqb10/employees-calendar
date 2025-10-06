CREATE TABLE "public"."employees" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "lastname" varchar(60) NOT NULL,
  "email" varchar(20) NOT NULL,
  "position" varchar(255) NOT NULL,
  "created_at" timestamptz NOT NULL,
  "created_by" int4 NOT NULL REFERENCES "public"."employees" ("id")
);
CREATE INDEX "idx_employees_email" ON "public"."employees" (
  "email"
);

CREATE TABLE "public"."schedule" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "start_date" timestamptz NOT NULL,
  "end_date" timestamptz NOT NULL,
  "title" varchar(50) NOT NULL,
  "employee_id" int4 NOT NULL REFERENCES "public"."employees" ("id"),
  "deleted_at" timestamptz NULL
);

CREATE INDEX "idx_schedule_start_date" ON "public"."schedule" (
  "start_date"
);
CREATE INDEX "idx_schedule_end_date" ON "public"."schedule" (
  "end_date"
);

INSERT INTO public.employees (name,lastname,email,position,created_at,created_by) VALUES
	 ('juan','lopez','juan@email.com','manager','2025-10-05 19:57:59.263352-06',1),
	 ('jorge','cano','jorge@email.com','seller','2025-10-05 21:46:02.414117-06',1),
	 ('elisa','cabrera','elisa@email.com','director','2025-10-05 21:46:02.418346-06',1),
	 ('patricia','cantu','paty@email.com','lead','2025-10-05 21:46:02.419645-06',1),
	 ('emiliano','rivera','emiliano@email.com','assistant','2025-10-05 21:46:02.420581-06',1);


