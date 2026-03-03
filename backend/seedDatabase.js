const { User, Job, Application, Interview } = require('./models');
const db = require('./config/database');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Application.destroy({ where: {} });
    await Interview.destroy({ where: {} });
    await Job.destroy({ where: {} });
    await User.destroy({ where: {} });

    console.log('Cleared existing data...');

    // Create users
    const users = await Promise.all([
      User.create({
        name: 'Admin User',
        email: 'admin@jobtrackerauth.com',
        password: 'admin123',
        role: 'Admin',
      }),
      User.create({
        name: 'John Recruiter',
        email: 'recruiter@jobtrackerauth.com',
        password: 'recruiter123',
        role: 'Recruiter',
      }),
      User.create({
        name: 'Alice Johnson',
        email: 'alice@candidate.com',
        password: 'alice123',
        role: 'Candidate',
      }),
      User.create({
        name: 'Bob Smith',
        email: 'bob@candidate.com',
        password: 'bob123',
        role: 'Candidate',
      }),
      User.create({
        name: 'Charlie Davis',
        email: 'charlie@candidate.com',
        password: 'charlie123',
        role: 'Candidate',
      }),
      User.create({
        name: 'Diana Wilson',
        email: 'diana@candidate.com',
        password: 'diana123',
        role: 'Candidate',
      }),
      User.create({
        name: 'Eve Martinez',
        email: 'eve@candidate.com',
        password: 'eve123',
        role: 'Candidate',
      }),
      User.create({
        name: 'Frank Brown',
        email: 'frank@candidate.com',
        password: 'frank123',
        role: 'Candidate',
      }),
      User.create({
        name: 'Grace Lee',
        email: 'grace@candidate.com',
        password: 'grace123',
        role: 'Candidate',
      }),
      User.create({
        name: 'Henry Taylor',
        email: 'henry@candidate.com',
        password: 'henry123',
        role: 'Candidate',
      }),
    ]);

    console.log('Created users:', users.length);

    // Create jobs
    const jobs = await Promise.all([
      Job.create({
        title: 'Senior React Developer',
        description: 'We are looking for an experienced React developer with 5+ years of experience.',
        department: 'Engineering',
        status: 'Open',
        createdBy: users[1].id,
      }),
      Job.create({
        title: 'Node.js Backend Engineer',
        description: 'Build scalable backend services using Node.js and Express.',
        department: 'Engineering',
        status: 'Open',
        createdBy: users[1].id,
      }),
      Job.create({
        title: 'UI/UX Designer',
        description: 'Create beautiful and intuitive user interfaces for our web applications.',
        department: 'Design',
        status: 'Open',
        createdBy: users[1].id,
      }),
      Job.create({
        title: 'Product Manager',
        description: 'Lead product strategy and development for our platform.',
        department: 'Product',
        status: 'Open',
        createdBy: users[1].id,
      }),
      Job.create({
        title: 'Database Administrator',
        description: 'Manage and optimize our PostgreSQL databases.',
        department: 'Engineering',
        status: 'Closed',
        createdBy: users[1].id,
      }),
      Job.create({
        title: 'Full Stack Developer',
        description: 'Build end-to-end web applications with React and Node.js.',
        department: 'Engineering',
        status: 'Open',
        createdBy: users[1].id,
      }),
      Job.create({
        title: 'QA Automation Engineer',
        description: 'Develop and maintain automated testing frameworks.',
        department: 'QA',
        status: 'Open',
        createdBy: users[1].id,
      }),
      Job.create({
        title: 'DevOps Engineer',
        description: 'Manage cloud infrastructure and CI/CD pipelines.',
        department: 'Infrastructure',
        status: 'Open',
        createdBy: users[1].id,
      }),
      Job.create({
        title: 'Business Analyst',
        description: 'Analyze business requirements and translate to technical specifications.',
        department: 'Product',
        status: 'Open',
        createdBy: users[1].id,
      }),
      Job.create({
        title: 'Data Scientist',
        description: 'Build machine learning models and analyze large datasets.',
        department: 'Data',
        status: 'Open',
        createdBy: users[1].id,
      }),
    ]);

    console.log('Created jobs:', jobs.length);

    // Create applications
    const applications = await Promise.all([
      // Alice Johnson applications
      Application.create({
        user_id: users[2].id,
        job_id: jobs[0].id,
        status: 'Applied',
      }),
      Application.create({
        user_id: users[2].id,
        job_id: jobs[1].id,
        status: 'Interviewing',
      }),
      Application.create({
        user_id: users[2].id,
        job_id: jobs[5].id,
        status: 'Offered',
      }),
      // Bob Smith applications
      Application.create({
        user_id: users[3].id,
        job_id: jobs[0].id,
        status: 'Applied',
      }),
      Application.create({
        user_id: users[3].id,
        job_id: jobs[2].id,
        status: 'Interviewing',
      }),
      Application.create({
        user_id: users[3].id,
        job_id: jobs[6].id,
        status: 'Rejected',
      }),
      // Charlie Davis applications
      Application.create({
        user_id: users[4].id,
        job_id: jobs[1].id,
        status: 'Applied',
      }),
      Application.create({
        user_id: users[4].id,
        job_id: jobs[3].id,
        status: 'Applied',
      }),
      Application.create({
        user_id: users[4].id,
        job_id: jobs[7].id,
        status: 'Interviewing',
      }),
      // Diana Wilson applications
      Application.create({
        user_id: users[5].id,
        job_id: jobs[2].id,
        status: 'Applied',
      }),
      Application.create({
        user_id: users[5].id,
        job_id: jobs[8].id,
        status: 'Offered',
      }),
      // Eve Martinez applications
      Application.create({
        user_id: users[6].id,
        job_id: jobs[4].id,
        status: 'Applied',
      }),
      Application.create({
        user_id: users[6].id,
        job_id: jobs[9].id,
        status: 'Interviewing',
      }),
      Application.create({
        user_id: users[6].id,
        job_id: jobs[6].id,
        status: 'Applied',
      }),
      // Frank Brown applications
      Application.create({
        user_id: users[7].id,
        job_id: jobs[3].id,
        status: 'Applied',
      }),
      Application.create({
        user_id: users[7].id,
        job_id: jobs[7].id,
        status: 'Applied',
      }),
      // Grace Lee applications
      Application.create({
        user_id: users[8].id,
        job_id: jobs[1].id,
        status: 'Offered',
      }),
      Application.create({
        user_id: users[8].id,
        job_id: jobs[5].id,
        status: 'Applied',
      }),
      // Henry Taylor applications
      Application.create({
        user_id: users[9].id,
        job_id: jobs[0].id,
        status: 'Interviewing',
      }),
      Application.create({
        user_id: users[9].id,
        job_id: jobs[2].id,
        status: 'Applied',
      }),
    ]);

    console.log('Created applications:', applications.length);

    // Create interviews
    const interviews = await Promise.all([
      Interview.create({
        application_id: applications[1].id,
        interview_date: new Date(2026, 2, 10, 14, 0, 0),
        interview_type: 'Phone Screen',
        feedback: 'Great communication skills, strong technical background',
      }),
      Interview.create({
        application_id: applications[4].id,
        interview_date: new Date(2026, 2, 12, 15, 30, 0),
        interview_type: 'Technical Interview',
        feedback: 'Excellent problem-solving skills, good code quality',
      }),
      Interview.create({
        application_id: applications[8].id,
        interview_date: new Date(2026, 2, 8, 10, 0, 0),
        interview_type: 'Phone Screen',
        feedback: 'Promising candidate, needs more experience',
      }),
      Interview.create({
        application_id: applications[11].id,
        interview_date: new Date(2026, 2, 15, 11, 0, 0),
        interview_type: 'Technical Interview',
        feedback: 'Strong analytical skills, good fit for the role',
      }),
      Interview.create({
        application_id: applications[16].id,
        interview_date: new Date(2026, 2, 20, 13, 30, 0),
        interview_type: 'Final Round',
        feedback: 'Excellent all-around candidate, ready for offer',
      }),
      Interview.create({
        application_id: applications[18].id,
        interview_date: new Date(2026, 2, 22, 14, 0, 0),
        interview_type: 'Technical Interview',
        feedback: 'Strong technical knowledge, good team fit',
      }),
    ]);

    console.log('Created interviews:', interviews.length);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('Admin: admin@jobtrackerauth.com / admin123');
    console.log('Recruiter: recruiter@jobtrackerauth.com / recruiter123');
    console.log('\nCandidates:');
    console.log('alice@candidate.com / alice123');
    console.log('bob@candidate.com / bob123');
    console.log('charlie@candidate.com / charlie123');
    console.log('diana@candidate.com / diana123');
    console.log('eve@candidate.com / eve123');
    console.log('frank@candidate.com / frank123');
    console.log('grace@candidate.com / grace123');
    console.log('henry@candidate.com / henry123');
    console.log('\nDatabase Summary:');
    console.log('✓ 10 Users (1 Admin, 1 Recruiter, 8 Candidates)');
    console.log('✓ 10 Jobs (9 Open, 1 Closed)');
    console.log('✓ 20 Applications (various statuses)');
    console.log('✓ 6 Interviews scheduled');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await db.close();
    process.exit(0);
  }
};

seedDatabase();
