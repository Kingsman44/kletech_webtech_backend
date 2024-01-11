const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const facultySchema = new mongoose.Schema({
    id: { type: Number, unique: true, index: true },
    name: String,
    email_id: { type: String, unique: true }, // Example of another unique field (email_id)
    designation: String,
    qualification: String,
    area_of_specialization: String,
    address: String,
    resi_contact_no: String,
    mobile_no: String,
    dob: Date,
});

const academicPerformanceSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    course: String,
    board_university: String,
    year_of_passing: Number,
    class_obtained: String,
});

const workExperienceSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', primary_key: true },
    institute_name: String,
    experience_type: String,
    from_to: String,
    designation: String,
    total_years: Number,
});

const subjectsTaughtSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', primary_key: true },
    course_title: String,
    times_taught: Number,
    taught_at: String,
});

const phdDetailsSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    research_centre: String,
    topic_area: String,
    registration_date: Date,
    part_time_full_time: String,
    guide_name: String,
    work_status: String,
});

const researchStudentsSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    student_name: String,
});

const facultyPhDResearchStudentsSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', primary_key: true },
    phd_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PhDDetails', primary_key: true },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ResearchStudents', primary_key: true },
});

const booksSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', primary_key: true },
    book_id: { type: Number, unique: true },
    title: String,
    year: String,
    remarks: String,
});

const booksPublishedSchema = new mongoose.Schema({
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Books', primary_key: true },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', primary_key: true },
});

const paperPublicationsSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', primary_key: true },
    paper_title: { type: mongoose.Schema.Types.ObjectId, ref: 'PaperPublications', primary_key: true },
    journal_conference_details: String,
    type: String,
    remarks_awards: String,
});

const membershipsSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', primary_key: true },
    organization_name: String,
    membership_type: String,
});

const committeesSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', primary_key: true },
    committee_name: String,
    capacity: String,
    from: Date,
    to: Date,
});

const attendedWorkshopsSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    workshop_details: String,
    start_date: Date,
    end_date: Date,
    place: String,
    remarks_awards: String,
});

const conductedWorkshopsSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', primary_key: true },
    workshop_details: String,
    start_date: Date,
    end_date: Date,
});

const fundedProjectsSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', primary_key: true },
    project_title: String,
    funding_agency: String,
    amount: Number,
    start_date: Date,
    end_date: Date,
    status: String,
});

const trainingDevelopmentSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', primary_key: true },
    training_areas: String,
    duration_days: Number,
});

const interestsSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', primary_key: true },
    interest_areas: String,
});

const otherInformationSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', primary_key: true },
    additional_info: String,
});

facultySchema.plugin(uniqueValidator);
academicPerformanceSchema.plugin(uniqueValidator);
workExperienceSchema.plugin(uniqueValidator);
subjectsTaughtSchema.plugin(uniqueValidator);
phdDetailsSchema.plugin(uniqueValidator);
researchStudentsSchema.plugin(uniqueValidator);
facultyPhDResearchStudentsSchema.plugin(uniqueValidator);
booksSchema.plugin(uniqueValidator);
booksPublishedSchema.plugin(uniqueValidator);
paperPublicationsSchema.plugin(uniqueValidator);
membershipsSchema.plugin(uniqueValidator);
committeesSchema.plugin(uniqueValidator);
attendedWorkshopsSchema.plugin(uniqueValidator);
conductedWorkshopsSchema.plugin(uniqueValidator);
fundedProjectsSchema.plugin(uniqueValidator);
trainingDevelopmentSchema.plugin(uniqueValidator);
interestsSchema.plugin(uniqueValidator);
otherInformationSchema.plugin(uniqueValidator);

const Faculty = mongoose.model('Faculty', facultySchema);
const AcademicPerformance = mongoose.model('AcademicPerformance', academicPerformanceSchema);
const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);
const SubjectsTaught = mongoose.model('SubjectsTaught', subjectsTaughtSchema);
const PhDDetails = mongoose.model('PhDDetails', phdDetailsSchema);
const ResearchStudents = mongoose.model('ResearchStudents', researchStudentsSchema);
const FacultyPhDResearchStudents = mongoose.model('FacultyPhDResearchStudents', facultyPhDResearchStudentsSchema);
const Books = mongoose.model('Books', booksSchema);
const BooksPublished = mongoose.model('BooksPublished', booksPublishedSchema);
const PaperPublications = mongoose.model('PaperPublications', paperPublicationsSchema);
const Memberships = mongoose.model('Memberships', membershipsSchema);
const Committees = mongoose.model('Committees', committeesSchema);
const AttendedWorkshops = mongoose.model('AttendedWorkshops', attendedWorkshopsSchema);
const ConductedWorkshops = mongoose.model('ConductedWorkshops', conductedWorkshopsSchema);
const FundedProjects = mongoose.model('FundedProjects', fundedProjectsSchema);
const TrainingDevelopment = mongoose.model('TrainingDevelopment', trainingDevelopmentSchema);
const Interests = mongoose.model('Interests', interestsSchema);
const OtherInformation = mongoose.model('OtherInformation', otherInformationSchema);

module.exports = {
    Faculty,
    AcademicPerformance,
    WorkExperience,
    SubjectsTaught,
    PhDDetails,
    ResearchStudents,
    FacultyPhDResearchStudents,
    Books,
    BooksPublished,
    PaperPublications,
    Memberships,
    Committees,
    AttendedWorkshops,
    ConductedWorkshops,
    FundedProjects,
    TrainingDevelopment,
    Interests,
    OtherInformation,
};