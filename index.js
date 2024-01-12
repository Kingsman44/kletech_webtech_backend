const USERNAME="shivan0972"
const PASSWORD="test1234"

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crs = require('cors')

const app = express();
app.use(crs());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
const port = 3000;

const {
    Faculty,
    AcademicPerformance,
    WorkExperience,
    Courses,
    PhDDetails,
    ResearchStudents,
    FacultyPhDResearchStudents,
    Books,
    BooksPublished,
    Conferences,
    Memberships,
    Committees,
    AttendedWorkshops,
    ConductedWorkshops,
    FundedProjects,
    TrainingDevelopment,
    Interests,
    OtherInformation,
} = require('./structure');

mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@kledatabase.t7xh5su.mongodb.net/mydb?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(bodyParser.json());

const tables = {
    'Faculty': Faculty,
    'AcademicPerformance': AcademicPerformance,
    'WorkExperience': WorkExperience,
    'Courses': Courses,
    'PhDDetails': PhDDetails,
    'ResearchStudents': ResearchStudents,
    'FacultyPhDResearchStudents': FacultyPhDResearchStudents,
    'Books': Books,
    'BooksPublished': BooksPublished,
    'Conferences': Conferences,
    'Memberships': Memberships,
    'Committees': Committees,
    'AttendedWorkshops': AttendedWorkshops,
    'ConductedWorkshops': ConductedWorkshops,
    'FundedProjects': FundedProjects,
    'TrainingDevelopment': TrainingDevelopment,
    'Interests': Interests,
    'OtherInformation': OtherInformation
}

const successResponse = { "status": "success" };
const failureResponse = { "status": "fail" };
const notFoundResponse = { "status": "not found" };

for (let modelName in tables) {
    let routeName = modelName.toLowerCase();

    app.put(`/update/${routeName}/:keys/:values`, async (req, res) => {
        try {
            const keys = req.params.keys.split(',');
            const values = req.params.values.split(',');
    
            if (keys.length !== values.length) {
                return res.status(400).send({ "error": "Number of keys and values should match" });
            }
    
            let query = {};
            keys.forEach((key, index) => {
                query[key] = values[index];
            });
    
            const updatedData = await tables[modelName].findOneAndUpdate(query, req.body, { new: true });
            if (!updatedData) {
                return res.status(404).send(notFoundResponse);
            }
            res.send(successResponse);
        } catch (error) {
            const err = failureResponse;
            err.reason = error;
            res.status(500).send(err);
        }
    });
    
    app.delete(`/delete/${routeName}/:keys/:values`, async (req, res) => {
        try {
            const keys = req.params.keys.split(',');
            const values = req.params.values.split(',');
    
            if (keys.length !== values.length) {
                return res.status(400).send({ "error": "Number of keys and values should match" });
            }
    
            let query = {};
            keys.forEach((key, index) => {
                query[key] = values[index];
            });
    
            const deletedData = await tables[modelName].deleteOne(query);
            if (!deletedData.deletedCount) {
                return res.status(404).send(notFoundResponse);
            }
            res.send(successResponse);
        } catch (error) {
            const err = failureResponse;
            err.reason = error;
            res.status(500).send(err);
        }
    });    
    
    app.get(`/fetch/${routeName}`, async (req, res) => {
        try {
            const allData = await tables[modelName].find({});
            console.log(allData);
            res.json(allData);
        } catch (error) {
            const err=failureResponse;
            err.reason=error;
            res.status(500).send(err);
        }
    });

    app.get(`/fetch/${routeName}/:keys/:values`, async (req, res) => {
        try {
            const keys = req.params.keys.split(',');
            const values = req.params.values.split(',');
    
            if (keys.length !== values.length) {
                return res.status(400).send({ "error": "Number of keys and values should match" });
            }
    
            let query = {};
            keys.forEach((key, index) => {
                query[key] = values[index];
            });
    
            const filteredData = await tables[modelName].find(query);
            res.json(filteredData);
        } catch (error) {
            const err = failureResponse;
            err.reason = error;
            res.status(500).send(err);
        }
    });
    
    app.post(`/insert/${routeName}`, async (req, res) => {
        try {
            const newData = new tables[modelName](req.body);
            await newData.save();
            res.send(successResponse);
        } catch (error) {
            const err=failureResponse;
            err.reason=error;
            res.status(500).send(err);
        }
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});