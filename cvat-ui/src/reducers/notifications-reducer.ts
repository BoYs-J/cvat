// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';

import { AuthActionTypes } from 'actions/auth-actions';
import { FormatsActionTypes } from 'actions/formats-actions';
import { ModelsActionTypes } from 'actions/models-actions';
import { ShareActionTypes } from 'actions/share-actions';
import { TasksActionTypes } from 'actions/tasks-actions';
import { ProjectsActionTypes } from 'actions/projects-actions';
import { AboutActionTypes } from 'actions/about-actions';
import { AnnotationActionTypes } from 'actions/annotation-actions';
import { NotificationsActionType } from 'actions/notification-actions';
import { BoundariesActionTypes } from 'actions/boundaries-actions';
import { UserAgreementsActionTypes } from 'actions/useragreements-actions';
import { ReviewActionTypes } from 'actions/review-actions';
import { ExportActionTypes } from 'actions/export-actions';
import { ImportActionTypes } from 'actions/import-actions';
import { CloudStorageActionTypes } from 'actions/cloud-storage-actions';
import { OrganizationActionsTypes } from 'actions/organization-actions';
import { JobsActionTypes } from 'actions/jobs-actions';

import { getCore } from 'cvat-core-wrapper';
import { NotificationsState } from '.';

const core = getCore();

const defaultState: NotificationsState = {
    errors: {
        auth: {
            authorized: null,
            login: null,
            logout: null,
            register: null,
            changePassword: null,
            requestPasswordReset: null,
            resetPassword: null,
            loadAuthActions: null,
        },
        projects: {
            fetching: null,
            updating: null,
            deleting: null,
            creating: null,
            restoring: null,
            backuping: null,
        },
        tasks: {
            fetching: null,
            updating: null,
            dumping: null,
            loading: null,
            exportingAsDataset: null,
            deleting: null,
            creating: null,
            exporting: null,
            importing: null,
            moving: null,
        },
        jobs: {
            updating: null,
            fetching: null,
        },
        formats: {
            fetching: null,
        },
        users: {
            fetching: null,
        },
        about: {
            fetching: null,
        },
        share: {
            fetching: null,
        },
        models: {
            starting: null,
            fetching: null,
            canceling: null,
            metaFetching: null,
            inferenceStatusFetching: null,
        },
        annotation: {
            saving: null,
            jobFetching: null,
            frameFetching: null,
            contextImageFetching: null,
            changingLabelColor: null,
            updating: null,
            creating: null,
            merging: null,
            grouping: null,
            splitting: null,
            removing: null,
            propagating: null,
            collectingStatistics: null,
            savingJob: null,
            uploadAnnotations: null,
            removeAnnotations: null,
            fetchingAnnotations: null,
            undo: null,
            redo: null,
            search: null,
            searchEmptyFrame: null,
            deleteFrame: null,
            restoreFrame: null,
            savingLogs: null,
        },
        boundaries: {
            resetError: null,
        },
        userAgreements: {
            fetching: null,
        },
        review: {
            commentingIssue: null,
            finishingIssue: null,
            reopeningIssue: null,
            resolvingIssue: null,
            submittingReview: null,
            deletingIssue: null,
        },
        predictor: {
            prediction: null,
        },
        exporting: {
            dataset: null,
            annotation: null,
        },
        importing: {
            dataset: null,
            annotation: null,
        },
        cloudStorages: {
            creating: null,
            fetching: null,
            updating: null,
            deleting: null,
        },
        organizations: {
            fetching: null,
            creating: null,
            updating: null,
            activation: null,
            deleting: null,
            leaving: null,
            inviting: null,
            updatingMembership: null,
            removingMembership: null,
        },
    },
    messages: {
        tasks: {
            loadingDone: '',
            importingDone: '',
            movingDone: '',
        },
        models: {
            inferenceDone: '',
        },
        auth: {
            changePasswordDone: '',
            registerDone: '',
            requestPasswordResetDone: '',
            resetPasswordDone: '',
        },
        projects: {
            restoringDone: '',
        },
    },
};

export default function (state = defaultState, action: AnyAction): NotificationsState {
    switch (action.type) {
        case AuthActionTypes.AUTHORIZED_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        authorized: {
                            message: '无法检查服务器上的授权',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AuthActionTypes.LOGIN_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        login: {
                            message: '无法在服务器上登录，请检查密码',
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-login-failed',
                        },
                    },
                },
            };
        }
        case AuthActionTypes.LOGOUT_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        logout: {
                            message: '无法从服务器注销',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AuthActionTypes.REGISTER_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        register: {
                            message: '无法在服务器上注册',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AuthActionTypes.REGISTER_SUCCESS: {
            if (!action.payload.user.isVerified) {
                return {
                    ...state,
                    messages: {
                        ...state.messages,
                        auth: {
                            ...state.messages.auth,
                            registerDone: `要使用您的帐户，您需要确认电子邮件地址。我们已经发送了一封带有确认链接的邮件 ${action.payload.user.email}.`,
                        },
                    },
                };
            }

            return {
                ...state,
            };
        }
        case AuthActionTypes.CHANGE_PASSWORD_SUCCESS: {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    auth: {
                        ...state.messages.auth,
                        changePasswordDone: '已保存新密码',
                    },
                },
            };
        }
        case AuthActionTypes.CHANGE_PASSWORD_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        changePassword: {
                            message: '无法更改密码',
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-change-password-failed',
                        },
                    },
                },
            };
        }
        case AuthActionTypes.REQUEST_PASSWORD_RESET_SUCCESS: {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    auth: {
                        ...state.messages.auth,
                        requestPasswordResetDone: `检查您电子邮件中重置密码的链接；
                        如果在几分钟内没有收到，请检查您的垃圾邮件（邮件30分钟内有效）`,
                    },
                },
            };
        }
        case AuthActionTypes.REQUEST_PASSWORD_RESET_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        requestPasswordReset: {
                            message: '无法在服务器上重置密码',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AuthActionTypes.RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    auth: {
                        ...state.messages.auth,
                        resetPasswordDone: '密码已用新密码重新设置',
                    },
                },
            };
        }
        case AuthActionTypes.RESET_PASSWORD_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        resetPassword: {
                            message: '无法在服务器上设置新密码，请联系管理员',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AuthActionTypes.LOAD_AUTH_ACTIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        loadAuthActions: {
                            message: '无法检查可用的身份验证操作',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ExportActionTypes.EXPORT_DATASET_FAILED: {
            const instanceID = action.payload.instance.id;
            const instanceType = action.payload.instance instanceof core.classes.Project ? '项目#' : '任务#';
            return {
                ...state,
                errors: {
                    ...state.errors,
                    exporting: {
                        ...state.errors.exporting,
                        dataset: {
                            message:
                                '无法导出 ' +
                                `<a href="/${instanceType}s/${instanceID}" target="_blank">` +
                                `${instanceType}${instanceID}</a> 的数据集`,
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ImportActionTypes.IMPORT_DATASET_FAILED: {
            const instanceID = action.payload.instance.id;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    exporting: {
                        ...state.errors.exporting,
                        dataset: {
                            message:
                                '无法导入到 ' +
                                `<a href="/projects/${instanceID}" target="_blank">` +
                                `项目#${instanceID}</a> 请检查格式`,
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case TasksActionTypes.GET_TASKS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    tasks: {
                        ...state.errors.tasks,
                        fetching: {
                            message: '无法获取任务',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case TasksActionTypes.LOAD_ANNOTATIONS_FAILED: {
            const taskID = action.payload.task.id;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    tasks: {
                        ...state.errors.tasks,
                        loading: {
                            message:
                                '无法上传注释到 ' +
                                `<a href="/tasks/${taskID}" target="_blank">任务#${taskID}</a>`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-load-annotation-failed',
                        },
                    },
                },
            };
        }
        case TasksActionTypes.LOAD_ANNOTATIONS_SUCCESS: {
            const taskID = action.payload.task.id;
            return {
                ...state,
                messages: {
                    ...state.messages,
                    tasks: {
                        ...state.messages.tasks,
                        loadingDone:
                            '已将注释加载到 ' +
                            `<a href="/tasks/${taskID}" target="_blank">任务#${taskID}</a>`,
                    },
                },
            };
        }
        case TasksActionTypes.UPDATE_TASK_FAILED: {
            const taskID = action.payload.task.id;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    tasks: {
                        ...state.errors.tasks,
                        updating: {
                            message: `无法更新 <a href="/tasks/${taskID}" target="_blank">任务#${taskID}</a>`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-update-task-failed',
                        },
                    },
                },
            };
        }
        case TasksActionTypes.DELETE_TASK_FAILED: {
            const { taskID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    tasks: {
                        ...state.errors.tasks,
                        deleting: {
                            message:
                                '无法删除 ' +
                                `<a href="/tasks/${taskID}" target="_blank">任务#${taskID}</a>`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-delete-task-failed',
                        },
                    },
                },
            };
        }
        case TasksActionTypes.CREATE_TASK_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    tasks: {
                        ...state.errors.tasks,
                        creating: {
                            message: '无法创建任务',
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-create-task-failed',
                        },
                    },
                },
            };
        }
        case TasksActionTypes.EXPORT_TASK_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    tasks: {
                        ...state.errors.tasks,
                        exporting: {
                            message: '无法导出任务',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case TasksActionTypes.IMPORT_TASK_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    tasks: {
                        ...state.errors.tasks,
                        importing: {
                            message: '无法导入任务',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case TasksActionTypes.IMPORT_TASK_SUCCESS: {
            const taskID = action.payload.task.id;
            return {
                ...state,
                messages: {
                    ...state.messages,
                    tasks: {
                        ...state.messages.tasks,
                        importingDone: `任务导入成功 <a href="/tasks/${taskID}">打开任务</a>`,
                    },
                },
            };
        }
        case TasksActionTypes.UPDATE_JOB_FAILED: {
            const jobID = action.payload.jobInstance.id;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    jobs: {
                        ...state.errors.jobs,
                        updating: {
                            message: `无法更新 工作#${jobID}`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-update-job-failed',
                        },
                    },
                },
            };
        }
        case ProjectsActionTypes.GET_PROJECTS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    projects: {
                        ...state.errors.projects,
                        fetching: {
                            message: '无法获取项目',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ProjectsActionTypes.CREATE_PROJECT_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    projects: {
                        ...state.errors.projects,
                        creating: {
                            message: '无法创建项目',
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-create-project-failed',
                        },
                    },
                },
            };
        }
        case ProjectsActionTypes.UPDATE_PROJECT_FAILED: {
            const { id: projectId } = action.payload.project;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    projects: {
                        ...state.errors.projects,
                        updating: {
                            message:
                                '无法更新 ' +
                                `<a href="/project/${projectId}" target="_blank">项目#${projectId}</a>`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-update-project-failed',
                        },
                    },
                },
            };
        }
        case ProjectsActionTypes.DELETE_PROJECT_FAILED: {
            const { projectId } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    projects: {
                        ...state.errors.projects,
                        updating: {
                            message:
                                '不能删除 ' +
                                `<a href="/project/${projectId}" target="_blank">项目#${projectId}</a>`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-delete-project-failed',
                        },
                    },
                },
            };
        }
        case ProjectsActionTypes.BACKUP_PROJECT_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    projects: {
                        ...state.errors.projects,
                        backuping: {
                            message: `无法备份项目#${action.payload.projectId}`,
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ProjectsActionTypes.RESTORE_PROJECT_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    projects: {
                        ...state.errors.projects,
                        restoring: {
                            message: '无法恢复项目',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ProjectsActionTypes.RESTORE_PROJECT_SUCCESS: {
            const { projectID } = action.payload;
            return {
                ...state,
                messages: {
                    ...state.messages,
                    projects: {
                        ...state.messages.projects,
                        restoringDone:
                            `项目已经成功创建
                            点击 <a href="/projects/${projectID}">这里</a> 打开`,
                    },
                },
            };
        }
        case FormatsActionTypes.GET_FORMATS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    formats: {
                        ...state.errors.formats,
                        fetching: {
                            message: '无法从服务器获取格式',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AboutActionTypes.GET_ABOUT_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    about: {
                        ...state.errors.about,
                        fetching: {
                            message: '无法获取有关服务器的信息',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ShareActionTypes.LOAD_SHARE_DATA_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    share: {
                        ...state.errors.share,
                        fetching: {
                            message: '无法从服务器加载共享数据',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ModelsActionTypes.GET_INFERENCE_STATUS_SUCCESS: {
            if (action.payload.activeInference.status === 'finished') {
                const { taskID } = action.payload;
                return {
                    ...state,
                    messages: {
                        ...state.messages,
                        models: {
                            ...state.messages.models,
                            inferenceDone:
                                '自动标注完成 ' +
                                `<a href="/tasks/${taskID}" target="_blank">任务#${taskID}</a>`,
                        },
                    },
                };
            }

            return {
                ...state,
            };
        }
        case ModelsActionTypes.FETCH_META_FAILED: {
            if (action.payload.error.toString().includes('status code 403')) {
                return state;
            }

            return {
                ...state,
                errors: {
                    ...state.errors,
                    models: {
                        ...state.errors.models,
                        metaFetching: {
                            message: '无法获取模型信息',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ModelsActionTypes.GET_INFERENCE_STATUS_FAILED: {
            const { taskID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    models: {
                        ...state.errors.models,
                        inferenceStatusFetching: {
                            message:
                                '获取推断状态错误 ' +
                                `<a href="/tasks/${taskID}" target="_blank">任务#${taskID}</a>`,
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ModelsActionTypes.GET_MODELS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    models: {
                        ...state.errors.models,
                        fetching: {
                            message: '无法从服务器获取模型',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ModelsActionTypes.START_INFERENCE_FAILED: {
            const { taskID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    models: {
                        ...state.errors.models,
                        starting: {
                            message:
                                '无法推断的模型 ' +
                                `<a href="/tasks/${taskID}" target="_blank">任务#${taskID}</a>`,
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ModelsActionTypes.CANCEL_INFERENCE_FAILED: {
            const { taskID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    models: {
                        ...state.errors.models,
                        canceling: {
                            message:
                                '无法取消模型推断 ' +
                                `<a href="/tasks/${taskID}" target="_blank">任务#${taskID}</a>`,
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.GET_JOB_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        jobFetching: {
                            message: '获取工作时出错',
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-fetch-job-failed',
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.CHANGE_FRAME_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        frameFetching: {
                            message: `无法获取到帧 ${action.payload.number}`,
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.GET_CONTEXT_IMAGE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        contextImageFetching: {
                            message: '无法从服务器上获取图像',
                            reason: action.payload.error,
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.SAVE_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        saving: {
                            message: '无法保存注释',
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-save-annotations-failed',
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.UPDATE_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        updating: {
                            message: '无法更新注释',
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-update-annotations-failed',
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.CREATE_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        creating: {
                            message: '无法创建注释',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.MERGE_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        merging: {
                            message: '无法合并注释',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.GROUP_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        grouping: {
                            message: '无法对注释进行分组',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.SPLIT_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        splitting: {
                            message: '无法拆分跟踪',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.REMOVE_OBJECT_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        removing: {
                            message: '无法删除对象',
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-remove-object-failed',
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.PROPAGATE_OBJECT_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        propagating: {
                            message: '无法传播对象',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.COLLECT_STATISTICS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        collectingStatistics: {
                            message: '无法收集注释统计信息',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.UPLOAD_JOB_ANNOTATIONS_FAILED: {
            const { job, error } = action.payload;

            const {
                id: jobID,
                taskId: taskID,
            } = job;

            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        uploadAnnotations: {
                            message:
                                '无法上传注释到 ' +
                                `<a href="/tasks/${taskID}/jobs/${jobID}" target="_blank">工作#${taskID}</a>`,
                            reason: error.toString(),
                            className: 'cvat-notification-notice-upload-annotations-fail',
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.REMOVE_JOB_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        removeAnnotations: {
                            message: '无法删除注释',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.FETCH_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        fetchingAnnotations: {
                            message: '无法获取注释',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.REDO_ACTION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        redo: {
                            message: '无法恢复',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.UNDO_ACTION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        undo: {
                            message: '无法撤销',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.SEARCH_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        search: {
                            message: '无法执行注释搜索',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.SEARCH_EMPTY_FRAME_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        searchEmptyFrame: {
                            message: '无法搜索空帧',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.SAVE_LOGS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        savingLogs: {
                            message: '无法将日志发送到服务器',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case BoundariesActionTypes.THROW_RESET_ERROR: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    boundaries: {
                        ...state.errors.annotation,
                        resetError: {
                            message: '无法重置状态',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case UserAgreementsActionTypes.GET_USER_AGREEMENTS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    userAgreements: {
                        ...state.errors.userAgreements,
                        fetching: {
                            message: '无法从服务器获取用户协议',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ReviewActionTypes.FINISH_ISSUE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    review: {
                        ...state.errors.review,
                        finishingIssue: {
                            message: '无法设立一个问题',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ReviewActionTypes.RESOLVE_ISSUE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    review: {
                        ...state.errors.review,
                        resolvingIssue: {
                            message: '无法解决这个问题',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ReviewActionTypes.REOPEN_ISSUE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    review: {
                        ...state.errors.review,
                        reopeningIssue: {
                            message: '无法重启这个问题',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ReviewActionTypes.COMMENT_ISSUE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    review: {
                        ...state.errors.review,
                        commentingIssue: {
                            message: '无法评论这个问题',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ReviewActionTypes.SUBMIT_REVIEW_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    review: {
                        ...state.errors.review,
                        submittingReview: {
                            message: `无法提交审查/验证到 工作#${action.payload.jobId}`,
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case ReviewActionTypes.REMOVE_ISSUE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    review: {
                        ...state.errors.review,
                        deletingIssue: {
                            message: '无法从服务器上删除问题',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case NotificationsActionType.RESET_ERRORS: {
            return {
                ...state,
                errors: {
                    ...defaultState.errors,
                },
            };
        }
        case NotificationsActionType.RESET_MESSAGES: {
            return {
                ...state,
                messages: {
                    ...defaultState.messages,
                },
            };
        }
        case AnnotationActionTypes.GET_DATA_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        jobFetching: {
                            message: '无法从服务器获取帧数据',
                            reason: action.payload.error,
                            className: 'cvat-notification-notice-fetch-frame-data-from-the-server-failed',
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.GET_PREDICTIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    predictor: {
                        ...state.errors.predictor,
                        prediction: {
                            message: '无法获取预测数据',
                            reason: action.payload.error,
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.DELETE_FRAME_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        deleteFrame: {
                            message: '无法删除帧',
                            reason: action.payload.error,
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.RESTORE_FRAME_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        restoreFrame: {
                            message: '无法恢复帧',
                            reason: action.payload.error,
                        },
                    },
                },
            };
        }
        case CloudStorageActionTypes.GET_CLOUD_STORAGE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    cloudStorages: {
                        ...state.errors.cloudStorages,
                        fetching: {
                            message: '无法获取云存储',
                            reason: action.payload.error.toString(),
                        },
                    },
                },
            };
        }
        case CloudStorageActionTypes.CREATE_CLOUD_STORAGE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    cloudStorages: {
                        ...state.errors.cloudStorages,
                        creating: {
                            message: '无法创建云存储',
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-create-cloud-storage-failed',
                        },
                    },
                },
            };
        }
        case CloudStorageActionTypes.UPDATE_CLOUD_STORAGE_FAILED: {
            const { cloudStorage, error } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    cloudStorages: {
                        ...state.errors.cloudStorages,
                        updating: {
                            message: `无法更新云存储 #${cloudStorage.id}`,
                            reason: error.toString(),
                            className: 'cvat-notification-notice-update-cloud-storage-failed',
                        },
                    },
                },
            };
        }
        case CloudStorageActionTypes.DELETE_CLOUD_STORAGE_FAILED: {
            const { cloudStorageID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    cloudStorages: {
                        ...state.errors.cloudStorages,
                        deleting: {
                            message:
                                `无法删除云存储 #${cloudStorageID}`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-delete-cloud-storage-failed',
                        },
                    },
                },
            };
        }
        case CloudStorageActionTypes.LOAD_CLOUD_STORAGE_CONTENT_FAILED: {
            const { cloudStorageID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    cloudStorages: {
                        ...state.errors.cloudStorages,
                        fetching: {
                            message: `无法获取云存储的内容 #${cloudStorageID}`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-fetch-cloud-storage-content-failed',
                        },
                    },
                },
            };
        }
        case CloudStorageActionTypes.GET_CLOUD_STORAGE_STATUS_FAILED: {
            const { cloudStorageID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    cloudStorages: {
                        ...state.errors.cloudStorages,
                        fetching: {
                            message: `无法获取云存储 #${cloudStorageID} 状态`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-fetch-cloud-storage-status-failed',
                        },
                    },
                },
            };
        }

        case CloudStorageActionTypes.GET_CLOUD_STORAGE_PREVIEW_FAILED: {
            const { cloudStorageID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    cloudStorages: {
                        ...state.errors.cloudStorages,
                        fetching: {
                            message: `无法获取云存储的预览信息 #${cloudStorageID}`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-fetch-cloud-storage-preview-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.GET_ORGANIZATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        fetching: {
                            message: '无法获取团队/组织列表',
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-fetch-organizations-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.CREATE_ORGANIZATION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        creating: {
                            message: `无法创建团队/组织 ${action.payload.slug}`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-create-organization-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.UPDATE_ORGANIZATION_FAILED: {
            const { slug } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        updating: {
                            message: `无法更新团队/组织 "${slug}"`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-update-organization-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.ACTIVATE_ORGANIZATION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        activation: {
                            message: `无法激活团队/组织 ${action.payload.slug || ''}`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-activate-organization-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.REMOVE_ORGANIZATION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        deleting: {
                            message: `无法移除团队/组织 ${action.payload.slug}`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-remove-organization-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.INVITE_ORGANIZATION_MEMBERS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        inviting: {
                            message: '无法邀请团队/组织成员',
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-invite-organization-members-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.INVITE_ORGANIZATION_MEMBER_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        inviting: {
                            message: `无法邀请该成员 "${action.payload.email}" 加入团队/组织`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-invite-organization-member-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.LEAVE_ORGANIZATION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        leaving: {
                            message: '无法离开团队/组织',
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-leave-organization-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.REMOVE_ORGANIZATION_MEMBER_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        removingMembership: {
                            message: `无法将成员 "${action.payload.username}" 从团队/组织移除`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-remove-organization-member-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.UPDATE_ORGANIZATION_MEMBER_FAILED: {
            const { role, username } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        updatingMembership: {
                            message: `无法分配角色 "${role}" 给 "${username}"`,
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-update-organization-membership-failed',
                        },
                    },
                },
            };
        }
        case JobsActionTypes.GET_JOBS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    jobs: {
                        ...state.errors.jobs,
                        fetching: {
                            message: '无法获取工作列表',
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-update-organization-membership-failed',
                        },
                    },
                },
            };
        }
        case BoundariesActionTypes.RESET_AFTER_ERROR:
        case AuthActionTypes.LOGOUT_SUCCESS: {
            return { ...defaultState };
        }
        default: {
            return state;
        }
    }
}
