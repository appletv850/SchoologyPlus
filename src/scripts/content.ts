import * as pages from "./pages";
import { initializeAnalytics } from "./utils/analytics";
import * as Api from "./utils/api";
import Modal from "./utils/modal";
import { Setting, generateDebugInfo } from "./utils/settings";

declare global {
    var SchoologyPlus: {
        Setting: typeof Setting;
        Modal: typeof Modal;
        Api: typeof Api;
        Pages: typeof pages;
        Debug: any;
    };
}

globalThis.SchoologyPlus = {
    Setting,
    Modal,
    Api,
    Pages: pages,
    Debug: JSON.parse(generateDebugInfo()),
};

// In case you want to import an SVG file, you can do it like this:
// import svgIcon from '../static/icons/icon.svg'

// checks to see if the current page matches the given path pattern
function matchPage(...patterns: RegExp[]) {
    return patterns.some(pattern => pattern.test(globalThis.location.pathname));
}

// function that returns a promise that resolves when the document is ready
function ready() {
    return new Promise<void>(resolve => {
        if (document.readyState != "loading") {
            resolve();
        } else {
            document.addEventListener("DOMContentLoaded", () => resolve());
        }
    });
}

async function load() {
    await initializeAnalytics();
    await pages.all.preload();
    await ready();
    await pages.all.load();

    if (
        matchPage(
            /^\/grades\/grades$/, // matches /grades/grades
            /^\/course\/\d+\/student_grades$/ // matches /course/1234/student_grades
        )
    ) {
        await pages.grades.load();
        await pages.course.load();
    }

    if (
        matchPage(
            /^\/course\/\d+\/materials$/ // matches /course/1234/materials
        )
    ) {
        await pages.materials.load();
    }

    if (
        matchPage(
            /^\/$/, // matches /
            /^\/home$/, // matches /home
            /^\/home\/(recent-activity|course-dashboard)$/ // matches /home/recent-activity and /home/course-dashboard
        )
    ) {
        await pages.course.load();
        await pages.home.load();
    }

    if (
        matchPage(
            /^\/course\/\d+/ // matches /course/1234(...)
        )
    ) {
        await pages.course.load();
    }

    if (
        matchPage(
            /^\/api/ // matches /api(...)
        )
    ) {
        await pages.apikey.load();
    }

    if (
        matchPage(
            /^\/user\/\d+$/ // matches /user/1234
        )
    ) {
        await pages.user.load();
    }

    if (
        matchPage(
            /^\/assignment\/\d+\/assessment$/ // matches /assignment/1234/assessment
        )
    ) {
        await pages.assessment.load();
    }

    if (
        matchPage(
            /^\/page\// // matches /page/(...)
        )
    ) {
        await pages.page.load();
    }

    if (
        matchPage(
            /^\/courses/ // matches /courses(...)
        )
    ) {
        await pages.course.load();
        await pages.courses.load();
    }
}

load();
