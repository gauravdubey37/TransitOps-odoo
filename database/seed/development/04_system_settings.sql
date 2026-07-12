-- Seed: System settings (idempotent)
-- Profile: all environments

INSERT INTO system_settings (setting_id, setting_key, setting_value) VALUES
    ('s0000000-0000-4000-8000-000000000001', 'fatigue_limit_hours', '8'),
    ('s0000000-0000-4000-8000-000000000002', 'mandatory_rest_hours', '11'),
    ('s0000000-0000-4000-8000-000000000003', 'carbon_factor_diesel', '2.68'),
    ('s0000000-0000-4000-8000-000000000004', 'carbon_factor_petrol', '2.31'),
    ('s0000000-0000-4000-8000-000000000005', 'carbon_factor_cng', '1.88'),
    ('s0000000-0000-4000-8000-000000000006', 'max_overtime_hours', '4'),
    ('s0000000-0000-4000-8000-000000000007', 'default_currency', 'INR'),
    ('s0000000-0000-4000-8000-000000000008', 'company_name', 'TransitOps Demo Fleet')
ON CONFLICT (setting_key) DO NOTHING;
