import LayoutProject from '../views/layout/layout-project';
import LayoutProjectData from '../views/layout/layout-project-data';
import LayoutProjectDocument from '../views/layout/layout-project-document';

import ProjectOverview from '../views/project/project-overview';
import ProjectDynamic from '../views/project/project-dynamic';
import ProjectPublish from '../views/project/project-publish';
import ProjectCreate from '../views/project/project-create';

import ProjectDataDisclose from '../views/project/project-data/project-data-disclose';
import ProjectDataDiscloseUpload from '../views/project/project-data/project-data-disclose-upload';
import ProjectDataDividend from '../views/project/project-data/project-data-dividend';
import ProjectDataDividendUpload from '../views/project/project-data/project-data-dividend-upload';
import ProjectDataOperation from '../views/project/project-data/project-data-operation';
import ProjectDataOperationUpload from '../views/project/project-data/project-data-operation-upload';
import ProjectDataBasic from '../views/project/project-data/project-data-basic';

import ProjectDocumentItems from '../views/project/project-document/project-document-items';
import ProjectDocumentFiles from '../views/project/project-document/project-document-files';

export default [
    {
        path: 'project',
        component: LayoutProject,
        children: [
            {
                path: 'overview',
                name: 'ProjectOverview',
                component: ProjectOverview
            },
            {
                path: 'dynamic',
                name: 'ProjectDynamic',
                component: ProjectDynamic
            },
            {
                path: 'publish',
                name: 'ProjectPublish',
                component: ProjectPublish
            },
            {
                path: 'create',
                name: 'ProjectCreate',
                component: ProjectCreate
            },
            {
                path: 'data',
                component: LayoutProjectData,
                children: [
                    {
                        path: 'disclose',
                        name: 'ProjectDataDisclose',
                        component: ProjectDataDisclose
                    },
                    {
                        path: 'disclose/upload',
                        name: 'ProjectDataDiscloseUpload',
                        component: ProjectDataDiscloseUpload
                    },
                    {
                        path: 'dividend',
                        name: 'ProjectDataDividend',
                        component: ProjectDataDividend
                    },
                    {
                        path: 'dividend/upload',
                        name: 'ProjectDataDividendUpload',
                        component: ProjectDataDividendUpload
                    },
                    {
                        path: 'operation',
                        name: 'ProjectDataOperation',
                        component: ProjectDataOperation
                    },
                    {
                        path: 'operation/upload',
                        name: 'ProjectDataOperationUpload',
                        component: ProjectDataOperationUpload
                    },
                    {
                        path: 'basic',
                        name: 'ProjectDataBasic',
                        component: ProjectDataBasic
                    }
                ]
            },
            {
                path: 'document',
                component: LayoutProjectDocument,
                children: [
                    {
                        path: 'items/:groupId',
                        name: 'ProjectDocumentItems',
                        component: ProjectDocumentItems
                    },
                    {
                        path: 'items/:groupId/files/:itemId',
                        name: 'ProjectDocumentFiles',
                        component: ProjectDocumentFiles
                    }
                ]
            }
        ]
    }
];
