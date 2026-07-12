-- Seed: System settings (idempotent)
-- Profile: all environments

INSERT INTO system_settings (setting_id, setting_key, setting_value) VALUES
    ('a5000000-0000-4000-8000-000000000001', 'fatigue_limit_hours', '8'),
    ('a5000000-0000-4000-8000-000000000002', 'mandatory_rest_hours', '11'),
    ('a5000000-0000-4000-8000-000000000003', 'carbon_factor_diesel', '2.68'),
    ('a5000000-0000-4000-8000-000000000004', 'carbon_factor_petrol', '2.31'),
    ('a5000000-0000-4000-8000-000000000005', 'carbon_factor_cng', '1.88'),
    ('a5000000-0000-4000-8000-000000000006', 'max_overtime_hours', '4'),
    ('a5000000-0000-4000-8000-000000000007', 'default_currency', 'INR'),
    ('a5000000-0000-4000-8000-000000000008', 'company_name', 'TransitOps Demo Fleet')
ON CONFLICT (setting_key) DO NOTHING;
