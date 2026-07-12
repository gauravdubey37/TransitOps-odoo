-- Seed: Roles and permissions (idempotent)
-- Profile: all environments

INSERT INTO roles (role_id, role_name, description) VALUES
    ('a0000000-0000-4000-8000-000000000001', 'Administrator', 'Full system access'),
    ('a0000000-0000-4000-8000-000000000002', 'Fleet Manager', 'Fleet operations management'),
    ('a0000000-0000-4000-8000-000000000003', 'Dispatcher', 'Trip assignment and scheduling'),
    ('a0000000-0000-4000-8000-000000000004', 'Driver', 'Driver portal access'),
    ('a0000000-0000-4000-8000-000000000005', 'Analyst', 'Analytics and reporting access')
ON CONFLICT (role_name) DO NOTHING;

INSERT INTO permissions (permission_id, permission_name, description) VALUES
    ('b0000000-0000-4000-8000-000000000001', 'users.read', 'Read users'),
    ('b0000000-0000-4000-8000-000000000002', 'users.create', 'Create users'),
    ('b0000000-0000-4000-8000-000000000003', 'users.update', 'Update users'),
    ('b0000000-0000-4000-8000-000000000004', 'users.delete', 'Delete users'),
    ('b0000000-0000-4000-8000-000000000005', 'drivers.read', 'Read drivers'),
    ('b0000000-0000-4000-8000-000000000006', 'drivers.create', 'Create drivers'),
    ('b0000000-0000-4000-8000-000000000007', 'drivers.update', 'Update drivers'),
    ('b0000000-0000-4000-8000-000000000008', 'drivers.delete', 'Delete drivers'),
    ('b0000000-0000-4000-8000-000000000009', 'vehicles.read', 'Read vehicles'),
    ('b0000000-0000-4000-8000-000000000010', 'vehicles.create', 'Create vehicles'),
    ('b0000000-0000-4000-8000-000000000011', 'vehicles.update', 'Update vehicles'),
    ('b0000000-0000-4000-8000-000000000012', 'vehicles.delete', 'Delete vehicles'),
    ('b0000000-0000-4000-8000-000000000013', 'trips.read', 'Read trips'),
    ('b0000000-0000-4000-8000-000000000014', 'trips.create', 'Create trips'),
    ('b0000000-0000-4000-8000-000000000015', 'trips.update', 'Update trips'),
    ('b0000000-0000-4000-8000-000000000016', 'trips.delete', 'Delete trips'),
    ('b0000000-0000-4000-8000-000000000017', 'analytics.read', 'Read analytics'),
    ('b0000000-0000-4000-8000-000000000018', 'reports.generate', 'Generate reports'),
    ('b0000000-0000-4000-8000-000000000019', 'settings.manage', 'Manage system settings')
ON CONFLICT (permission_name) DO NOTHING;

-- Administrator gets all permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT 'a0000000-0000-4000-8000-000000000001', permission_id FROM permissions
ON CONFLICT DO NOTHING;

-- Fleet Manager permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT 'a0000000-0000-4000-8000-000000000002', permission_id FROM permissions
WHERE permission_name IN (
    'drivers.read', 'drivers.create', 'drivers.update',
    'vehicles.read', 'vehicles.create', 'vehicles.update',
    'trips.read', 'trips.create', 'trips.update',
    'analytics.read', 'reports.generate'
)
ON CONFLICT DO NOTHING;

-- Dispatcher permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT 'a0000000-0000-4000-8000-000000000003', permission_id FROM permissions
WHERE permission_name IN (
    'drivers.read', 'vehicles.read',
    'trips.read', 'trips.create', 'trips.update'
)
ON CONFLICT DO NOTHING;

-- Driver permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT 'a0000000-0000-4000-8000-000000000004', permission_id FROM permissions
WHERE permission_name IN ('trips.read', 'drivers.read')
ON CONFLICT DO NOTHING;

-- Analyst permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT 'a0000000-0000-4000-8000-000000000005', permission_id FROM permissions
WHERE permission_name IN ('analytics.read', 'reports.generate', 'drivers.read', 'vehicles.read', 'trips.read')
ON CONFLICT DO NOTHING;
