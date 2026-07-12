-- Seed: Demo operational data (idempotent)
-- Profile: development, demo only

INSERT INTO routes (route_id, source, destination, distance_km, estimated_time, toll_cost, average_fuel, average_carbon, average_cost) VALUES
    ('12000000-0000-4000-8000-000000000001', 'Delhi', 'Mumbai', 1400, 24, 2500, 350, 938, 45000),
    ('12000000-0000-4000-8000-000000000002', 'Mumbai', 'Pune', 150, 3, 350, 25, 67, 5000),
    ('12000000-0000-4000-8000-000000000003', 'Bangalore', 'Hyderabad', 570, 9, 800, 120, 322, 18000),
    ('12000000-0000-4000-8000-000000000004', 'Delhi', 'Jaipur', 280, 5, 400, 45, 121, 9000),
    ('12000000-0000-4000-8000-000000000005', 'Pune', 'Bangalore', 840, 14, 1200, 180, 482, 28000)
ON CONFLICT (route_id) DO NOTHING;

INSERT INTO vehicles (vehicle_id, registration_number, vehicle_class, manufacturer, model, manufacturing_year, fuel_type, mileage, load_capacity, current_odometer, status) VALUES
    ('13000000-0000-4000-8000-000000000001', 'DL01AB1234', 'Truck', 'Tata', 'Prima', 2022, 'Diesel', 4.5, 25000, 45000, 'Available'),
    ('13000000-0000-4000-8000-000000000002', 'MH12CD5678', 'Truck', 'Ashok Leyland', 'U-Truck', 2021, 'Diesel', 4.2, 20000, 62000, 'Available'),
    ('13000000-0000-4000-8000-000000000003', 'KA03EF9012', 'Bus', 'Volvo', 'B9R', 2023, 'Diesel', 3.8, 45000, 28000, 'Available'),
    ('13000000-0000-4000-8000-000000000004', 'MH14GH3456', 'Mini Truck', 'Mahindra', 'Blazo', 2022, 'Diesel', 5.1, 7500, 35000, 'Available'),
    ('13000000-0000-4000-8000-000000000005', 'DL07IJ7890', 'SUV', 'Toyota', 'Innova', 2024, 'Diesel', 12.5, 800, 15000, 'Available')
ON CONFLICT (registration_number) DO NOTHING;

INSERT INTO drivers (driver_id, employee_code, first_name, last_name, phone, email, joining_date, salary, driver_status, current_region_id, current_depot_id) VALUES
    ('a3000000-0000-4000-8000-000000000001', 'DRV001', 'Rajesh', 'Kumar', '+919876543210', 'rajesh.kumar@transitops.local', '2020-03-15', 35000, 'Available', '10000000-0000-4000-8000-000000000001', '11000000-0000-4000-8000-000000000001'),
    ('a3000000-0000-4000-8000-000000000002', 'DRV002', 'Suresh', 'Patel', '+919876543211', 'suresh.patel@transitops.local', '2019-07-22', 38000, 'Available', '10000000-0000-4000-8000-000000000004', '11000000-0000-4000-8000-000000000002'),
    ('a3000000-0000-4000-8000-000000000003', 'DRV003', 'Amit', 'Sharma', '+919876543212', 'amit.sharma@transitops.local', '2021-01-10', 32000, 'Available', '10000000-0000-4000-8000-000000000002', '11000000-0000-4000-8000-000000000004'),
    ('a3000000-0000-4000-8000-000000000004', 'DRV004', 'Vikram', 'Singh', '+919876543213', 'vikram.singh@transitops.local', '2018-11-05', 42000, 'Available', '10000000-0000-4000-8000-000000000001', '11000000-0000-4000-8000-000000000001'),
    ('a3000000-0000-4000-8000-000000000005', 'DRV005', 'Priya', 'Nair', '+919876543214', 'priya.nair@transitops.local', '2022-06-18', 30000, 'Available', '10000000-0000-4000-8000-000000000002', '11000000-0000-4000-8000-000000000005')
ON CONFLICT (employee_code) DO NOTHING;

INSERT INTO driver_licenses (license_id, driver_id, license_number, license_type, issue_date, expiry_date, issuing_authority) VALUES
    ('a3100000-0000-4000-8000-000000000001', 'a3000000-0000-4000-8000-000000000001', 'DL0420210001234', 'HMV', '2015-06-01', '2035-06-01', 'RTO Delhi'),
    ('a3100000-0000-4000-8000-000000000002', 'a3000000-0000-4000-8000-000000000002', 'MH1220190005678', 'Transport', '2010-03-15', '2030-03-15', 'RTO Mumbai'),
    ('a3100000-0000-4000-8000-000000000003', 'a3000000-0000-4000-8000-000000000003', 'KA0320200009012', 'HMV', '2012-08-20', '2032-08-20', 'RTO Bangalore')
ON CONFLICT (license_id) DO NOTHING;

INSERT INTO driver_experience (experience_id, driver_id, total_trips, total_hours, total_distance, primary_vehicle_class, primary_route, primary_region) VALUES
    ('a3200000-0000-4000-8000-000000000001', 'a3000000-0000-4000-8000-000000000001', 450, 3200, 180000, 'Truck', 'Delhi-Mumbai', 'North'),
    ('a3200000-0000-4000-8000-000000000002', 'a3000000-0000-4000-8000-000000000002', 380, 2800, 150000, 'Truck', 'Mumbai-Pune', 'West'),
    ('a3200000-0000-4000-8000-000000000003', 'a3000000-0000-4000-8000-000000000003', 220, 1600, 95000, 'Bus', 'Bangalore-Hyderabad', 'South')
ON CONFLICT (driver_id) DO NOTHING;

INSERT INTO driver_fatigue (fatigue_id, driver_id, continuous_hours, overtime_hours, fatigue_level) VALUES
    ('a3300000-0000-4000-8000-000000000001', 'a3000000-0000-4000-8000-000000000001', 2, 0, 'Normal'),
    ('a3300000-0000-4000-8000-000000000002', 'a3000000-0000-4000-8000-000000000002', 4, 1, 'Moderate'),
    ('a3300000-0000-4000-8000-000000000003', 'a3000000-0000-4000-8000-000000000003', 0, 0, 'Normal')
ON CONFLICT (driver_id) DO NOTHING;

INSERT INTO trips (trip_id, driver_id, vehicle_id, route_id, status, start_time, planned_distance, actual_distance, planned_duration, toll_cost) VALUES
    ('a4000000-0000-4000-8000-000000000001', 'a3000000-0000-4000-8000-000000000001', '13000000-0000-4000-8000-000000000001', '12000000-0000-4000-8000-000000000001', 'Scheduled', NOW() + INTERVAL '1 day', 1400, NULL, 24, 2500),
    ('a4000000-0000-4000-8000-000000000002', 'a3000000-0000-4000-8000-000000000002', '13000000-0000-4000-8000-000000000002', '12000000-0000-4000-8000-000000000002', 'Assigned', NOW() + INTERVAL '2 days', 150, NULL, 3, 350),
    ('a4000000-0000-4000-8000-000000000003', 'a3000000-0000-4000-8000-000000000003', '13000000-0000-4000-8000-000000000003', '12000000-0000-4000-8000-000000000003', 'Completed', NOW() - INTERVAL '3 days', 570, 575, 9, 800)
ON CONFLICT (trip_id) DO NOTHING;
