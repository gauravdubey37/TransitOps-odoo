import { db } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

const SYSTEM_ROLES = [
  { name: 'Administrator', description: 'System Administrator with full access' },
  { name: 'Fleet Manager', description: 'Manages vehicles and maintenance' },
  { name: 'Dispatcher', description: 'Assigns drivers and vehicles to trips' },
  { name: 'Driver', description: 'Executes trips and updates status' },
  { name: 'Analyst', description: 'View-only access for reports and analytics' },
];

export async function seedRoles() {
  console.log('Seeding system roles...');
  try {
    for (const role of SYSTEM_ROLES) {
      const existing = await db.query('SELECT * FROM roles WHERE role_name = $1', [role.name]);
      if (existing.rowCount === 0) {
        const id = uuidv4();
        await db.query(
          'INSERT INTO roles (role_id, role_name, description) VALUES ($1, $2, $3)',
          [id, role.name, role.description]
        );
        console.log(`Seeded role: ${role.name} (${id})`);
      } else {
        console.log(`Role already exists: ${role.name}`);
      }
    }
    console.log('Role seeding completed.');
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
}

// If this script is run directly
if (require.main === module) {
  seedRoles().then(() => process.exit(0)).catch(() => process.exit(1));
}
