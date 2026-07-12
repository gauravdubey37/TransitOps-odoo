-- Seed: Regions and depots (idempotent)
-- Profile: development, demo, testing

INSERT INTO regions (region_id, region_name, state, country) VALUES
    ('r0000000-0000-4000-8000-000000000001', 'North', 'Delhi', 'India'),
    ('r0000000-0000-4000-8000-000000000002', 'South', 'Karnataka', 'India'),
    ('r0000000-0000-4000-8000-000000000003', 'East', 'West Bengal', 'India'),
    ('r0000000-0000-4000-8000-000000000004', 'West', 'Maharashtra', 'India'),
    ('r0000000-0000-4000-8000-000000000005', 'Central', 'Madhya Pradesh', 'India')
ON CONFLICT (region_id) DO NOTHING;

INSERT INTO depots (depot_id, depot_name, region_id, address) VALUES
    ('p0000000-0000-4000-8000-000000000001', 'Delhi Depot', 'r0000000-0000-4000-8000-000000000001', 'Delhi, India'),
    ('p0000000-0000-4000-8000-000000000002', 'Mumbai Depot', 'r0000000-0000-4000-8000-000000000004', 'Mumbai, Maharashtra'),
    ('p0000000-0000-4000-8000-000000000003', 'Pune Depot', 'r0000000-0000-4000-8000-000000000004', 'Pune, Maharashtra'),
    ('p0000000-0000-4000-8000-000000000004', 'Bangalore Depot', 'r0000000-0000-4000-8000-000000000002', 'Bangalore, Karnataka'),
    ('p0000000-0000-4000-8000-000000000005', 'Hyderabad Depot', 'r0000000-0000-4000-8000-000000000002', 'Hyderabad, Telangana')
ON CONFLICT (depot_id) DO NOTHING;
