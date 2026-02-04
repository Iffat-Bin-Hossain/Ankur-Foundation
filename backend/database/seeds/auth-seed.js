const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🌱 Seeding database...\n');

    // Clear existing data
    await prisma.auditLog.deleteMany();
    await prisma.transaction.deleteMany();
    await prisma.rolePermission.deleteMany();
    await prisma.account.deleteMany();
    await prisma.committee.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    console.log('✓ Cleared existing data\n');

    // Create users with different roles
    const hashedPassword = await bcrypt.hash('password123', 12);

    const president = await prisma.user.create({
      data: {
        email: 'president@ankur.org',
        password: hashedPassword,
        name: 'Amit Kumar',
        role: 'PRESIDENT',
        isActive: true,
      },
    });
    console.log(`✓ Created PRESIDENT: ${president.name} (${president.email})`);

    const secretary = await prisma.user.create({
      data: {
        email: 'secretary@ankur.org',
        password: hashedPassword,
        name: 'Priya Singh',
        role: 'SECRETARY',
        isActive: true,
      },
    });
    console.log(`✓ Created SECRETARY: ${secretary.name} (${secretary.email})`);

    const treasurer = await prisma.user.create({
      data: {
        email: 'treasurer@ankur.org',
        password: hashedPassword,
        name: 'Rajesh Patel',
        role: 'TREASURER',
        isActive: true,
      },
    });
    console.log(`✓ Created TREASURER: ${treasurer.name} (${treasurer.email})`);

    const member = await prisma.user.create({
      data: {
        email: 'member@ankur.org',
        password: hashedPassword,
        name: 'Deepika Sharma',
        role: 'MEMBER',
        isActive: true,
      },
    });
    console.log(`✓ Created MEMBER: ${member.name} (${member.email})`);

    const auditor = await prisma.user.create({
      data: {
        email: 'auditor@ankur.org',
        password: hashedPassword,
        name: 'Vikram Verma',
        role: 'AUDITOR',
        isActive: true,
      },
    });
    console.log(`✓ Created AUDITOR: ${auditor.name} (${auditor.email})\n`);

    // Create committees
    const financeCommittee = await prisma.committee.create({
      data: {
        name: 'Finance Committee',
        description: 'Manages all financial matters and budgeting',
        presidentId: president.id,
        isActive: true,
      },
    });
    console.log(`✓ Created Committee: ${financeCommittee.name}`);

    const programCommittee = await prisma.committee.create({
      data: {
        name: 'Program Committee',
        description: 'Oversees NGO programs and initiatives',
        presidentId: president.id,
        isActive: true,
      },
    });
    console.log(`✓ Created Committee: ${programCommittee.name}\n`);

    // Create accounts
    const generalFund = await prisma.account.create({
      data: {
        name: 'General Fund',
        accountType: 'SAVINGS',
        balance: 50000,
        committeeId: financeCommittee.id,
        treasurerId: treasurer.id,
      },
    });
    console.log(`✓ Created Account: ${generalFund.name} (₹${generalFund.balance})`);

    const emergencyFund = await prisma.account.create({
      data: {
        name: 'Emergency Fund',
        accountType: 'EMERGENCY',
        balance: 25000,
        committeeId: financeCommittee.id,
        treasurerId: treasurer.id,
      },
    });
    console.log(`✓ Created Account: ${emergencyFund.name} (₹${emergencyFund.balance})\n`);

    // Create transactions
    await prisma.transaction.create({
      data: {
        type: 'INCOME',
        amount: 5000,
        description: 'Donation received from ABC Foundation',
        accountId: generalFund.id,
      },
    });
    console.log('✓ Created Transaction: Income of ₹5000');

    await prisma.transaction.create({
      data: {
        type: 'EXPENSE',
        amount: 1500,
        description: 'Office supplies and equipment',
        accountId: generalFund.id,
      },
    });
    console.log('✓ Created Transaction: Expense of ₹1500\n');

    // Create audit logs
    await prisma.auditLog.create({
      data: {
        userId: president.id,
        action: 'CREATE',
        entity: 'COMMITTEE',
        entityId: financeCommittee.id,
        changes: JSON.stringify({ name: 'Finance Committee' }),
      },
    });
    console.log('✓ Created Audit Log: Committee creation');

    await prisma.auditLog.create({
      data: {
        userId: secretary.id,
        action: 'CREATE',
        entity: 'TRANSACTION',
        entityId: generalFund.id,
        changes: JSON.stringify({ type: 'INCOME', amount: 5000 }),
      },
    });
    console.log('✓ Created Audit Log: Transaction creation\n');

    // Create sample posts
    await prisma.post.create({
      data: {
        title: 'Welcome to Ankur Foundation',
        content: 'We are committed to making a difference in our community.',
        published: true,
      },
    });
    console.log('✓ Created Post: Welcome to Ankur Foundation\n');

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📧 Test Credentials:');
    console.log('   PRESIDENT:  president@ankur.org / password123');
    console.log('   SECRETARY:  secretary@ankur.org / password123');
    console.log('   TREASURER:  treasurer@ankur.org / password123');
    console.log('   MEMBER:     member@ankur.org / password123');
    console.log('   AUDITOR:    auditor@ankur.org / password123\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
