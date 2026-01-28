# Diagrame C4 - Catalog Electronic

## 1. Context Diagram (Level 1)

```mermaid
graph TB
    subgraph "Catalog Electronic System"
        CatalogSystem[Catalog Electronic<br/>Web Application]
    end
    
    Student[Student<br/>Person]
    Profesor[Profesor<br/>Person]
    Administrator[Administrator<br/>Person]
    Parinte[Părinte<br/>Person]
    
    Student -->|Vizualizează note,<br/>absențe, orar| CatalogSystem
    Profesor -->|Gestionează note,<br/>absențe, materii| CatalogSystem
    Administrator -->|Administrează utilizatori,<br/>clase, materii| CatalogSystem
    Parinte -->|Vizualizează situația<br/>școlară copil| CatalogSystem
```

## 2. Container Diagram (Level 2)

```mermaid
graph TB
    subgraph "Firebase Platform"
        subgraph "Frontend"
            WebApp[React Web Application<br/>TypeScript, React Router<br/>Container: SPA]
        end
        
        subgraph "Backend Services"
            Auth[Firebase Authentication<br/>Service]
            Firestore[Cloud Firestore<br/>NoSQL Database]
            Functions[Firebase Functions<br/>Node.js, TypeScript<br/>Serverless Functions]
            Storage[Firebase Storage<br/>File Storage]
        end
        
        subgraph "Hosting Services"
            VercelHost[Vercel<br/>Static Web Hosting<br/>Edge Functions]
        end
    end
    
    Student[Student]
    Profesor[Profesor]
    Administrator[Administrator]
    Parinte[Părinte]
    
    Student --> WebApp
    Profesor --> WebApp
    Administrator --> WebApp
    Parinte --> WebApp
    
    WebApp --> Auth
    WebApp --> Firestore
    WebApp --> Functions
    WebApp --> Storage
    WebApp --> VercelHost
    
    Functions --> Firestore
    Functions --> Auth
```

## 3. Component Diagram (Level 3)

```mermaid
graph TB
    subgraph "React Web Application"
        subgraph "Authentication Layer"
            LoginComponent[Login Component]
            AuthContext[Auth Context/Provider]
            ProtectedRoute[Protected Routes]
        end
        
        subgraph "UI Components"
            Dashboard[Dashboard Component]
            GradeManagement[Grade Management<br/>Component]
            AttendanceManagement[Attendance Management<br/>Component]
            ClassManagement[Class Management<br/>Component]
            UserManagement[User Management<br/>Component]
            Reports[Reports Component]
            Schedule[Schedule Component]
        end
        
        subgraph "Services"
            AuthService[Authentication Service]
            DataService[Data Service]
            NotificationService[Notification Service]
            ReportService[Report Service]
        end
        
        subgraph "State Management"
            ReduxStore[Redux Store/<br/>Context API]
        end
    end
    
    subgraph "Firebase Functions"
        subgraph "API Functions"
            GradeCalculation[Grade Calculation<br/>Function]
            NotificationTrigger[Notification Trigger<br/>Function]
            ReportGeneration[Report Generation<br/>Function]
            DataValidation[Data Validation<br/>Function]
        end
        
        subgraph "Scheduled Functions"
            DailyReports[Daily Reports<br/>Function]
            AttendanceCheck[Attendance Check<br/>Function]
        end
        
        subgraph "Database Triggers"
            OnGradeChange[On Grade Change<br/>Trigger]
            OnAttendanceUpdate[On Attendance Update<br/>Trigger]
        end
    end
    
    LoginComponent --> AuthService
    Dashboard --> DataService
    GradeManagement --> DataService
    AttendanceManagement --> DataService
    ClassManagement --> DataService
    UserManagement --> DataService
    Reports --> ReportService
    
    AuthService --> AuthContext
    DataService --> ReduxStore
    NotificationService --> ReduxStore
    
    DataService --> GradeCalculation
    DataService --> DataValidation
    NotificationService --> NotificationTrigger
    ReportService --> ReportGeneration
```

## 4. Code/Class Diagram (Level 4) - Main Data Models

```mermaid
classDiagram
    class User {
        +string uid
        +string email
        +string firstName
        +string lastName
        +string role
        +Date createdAt
        +Date updatedAt
    }
    
    class Student {
        +string studentId
        +string userId
        +string classId
        +string parentId
        +Date dateOfBirth
        +string address
    }
    
    class Teacher {
        +string teacherId
        +string userId
        +string[] subjectIds
        +string[] classIds
    }
    
    class Parent {
        +string parentId
        +string userId
        +string[] studentIds
        +string phoneNumber
    }
    
    class Class {
        +string classId
        +string className
        +string academicYear
        +string teacherId
        +string[] studentIds
        +string[] subjectIds
    }
    
    class Subject {
        +string subjectId
        +string subjectName
        +string teacherId
        +string classId
        +number hoursPerWeek
    }
    
    class Grade {
        +string gradeId
        +string studentId
        +string subjectId
        +string teacherId
        +number value
        +string type
        +Date date
        +string notes
    }
    
    class Attendance {
        +string attendanceId
        +string studentId
        +string subjectId
        +Date date
        +string status
        +string notes
    }
    
    class Schedule {
        +string scheduleId
        +string classId
        +string day
        +string time
        +string subjectId
        +string teacherId
        +string room
    }
    
    User <|-- Student
    User <|-- Teacher
    User <|-- Parent
    Student "many" --* "1" Class
    Teacher "many" --* "many" Class
    Teacher "1" --* "many" Subject
    Parent "1" --* "many" Student
    Grade "many" --* "1" Student
    Grade "many" --* "1" Subject
    Attendance "many" --* "1" Student
    Schedule "many" --* "1" Class
    Schedule "many" --* "1" Subject
```

## Arhitectură tehnică detaliată

### Frontend (React)
- **Framework**: React 18+ cu TypeScript
- **Routing**: React Router v6
- **State Management**: Redux Toolkit sau Context API
- **UI Library**: Material-UI sau Ant Design
- **Forms**: React Hook Form cu Yup validation
- **API Communication**: Axios sau Firebase SDK

### Backend (Firebase)
- **Authentication**: Firebase Auth (Email/Password, Google OAuth)
- **Database**: Cloud Firestore cu structură NoSQL optimizată
- **Functions**: Node.js 18+ cu TypeScript
- **Storage**: Firebase Storage pentru documente și rapoarte

### Hosting & Deployment (Vercel)
- **Platform**: Vercel pentru deployment și hosting
- **Edge Functions**: Vercel Edge Functions pentru optimizare
- **CDN**: Vercel Edge Network cu 100+ PoP-uri globale
- **CI/CD**: Automatic deployments din GitHub
- **Preview Deployments**: Automatic preview pentru fiecare PR

### Security
- **Authentication**: Multi-factor authentication disponibilă
- **Authorization**: Role-based access control (RBAC)
- **Data Validation**: Schema validation în Functions
- **Rate Limiting**: Firebase Security Rules
- **Encryption**: TLS/SSL pentru toate conexiunile

### Scalability
- **Auto-scaling**: Firebase Functions scalează automat
- **Caching**: Firestore offline persistence + Vercel Edge Cache
- **CDN**: Vercel Edge Network pentru assets și pagini
- **Load Balancing**: Gestionat automat de Firebase și Vercel
- **Edge Functions**: Vercel Edge Functions pentru response-uri rapide

### Monitoring
- **Performance**: Firebase Performance Monitoring
- **Analytics**: Firebase Analytics
- **Error Tracking**: Firebase Crashlytics
- **Logging**: Cloud Logging pentru Functions