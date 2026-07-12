-- Seed: Regions and depots (idempotent)
-- Profile: development, demo, testing

INSERT INTO regions (region_id, region_name, state, country) VALUES
    ('10000000-0000-4000-8000-000000000001', 'North', 'Delhi', 'India'),
    ('10000000-0000-4000-8000-000000000002', 'South', 'Karnataka', 'India'),
    ('10000000-0000-4000-8000-000000000003', 'East', 'West Bengal', 'India'),
    ('10000000-0000-4000-8000-000000000004', 'West', 'Maharashtra', 'India'),
    ('10000000-0000-4000-8000-000000000005', 'Central', 'Madhya Pradesh', 'India')
ON CONFLICT (region_id) DO NOTHING;

INSERT INTO depots (depot_id, depot_name, region_id, address) VALUES
    ('11000000-0000-4000-8000-000000000001', 'Delhi Depot', '10000000-0000-4000-8000-000000000001', 'Delhi, India'),
    ('11000000-0000-4000-8000-000000000002', 'Mumbai Depot', '10000000-0000-4000-8000-000000000004', 'Mumbai, Maharashtra'),
    ('11000000-0000-4000-8000-000000000003', 'Pune Depot', '10000000-0000-4000-8000-000000000004', 'Pune, Maharashtra'),
    ('11000000-0000-4000-8000-000000000004', 'Bangalore Depot', '10000000-0000-4000-8000-000000000002', 'Bangalore, Karnataka'),
    ('11000000-0000-4000-8000-000000000005', 'Hyderabad Depot', '10000000-0000-4000-8000-000000000002', 'Hyderabad, Telangana')
ON CONFLICT (depot_id) DO NOTHING;
