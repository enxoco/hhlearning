<?php

require_once('../vendor/autoload.php');
require_once('./glob_recursive.php');
require('../db-config.php');

use Hashids\Hashids;

$request = explode('/parents/', $_SERVER['REQUEST_URI'])[1];
$hashids = new Hashids(getenv('REACT_APP_SALT'), getenv('REACT_APP_SALT_LENGTH'));
$parent_id = $hashids->decode($request)[0];
$query = $db_con->prepare('SELECT id, "firstName", "lastName" FROM "Student" WHERE "Student".parent = :parent_id');
$query->bindParam(':parent_id', $parent_id, PDO::PARAM_STR);
$query->execute();
$students = $query->fetchAll(PDO::FETCH_ASSOC);

function get_semester(){
    $today = new DateTime();

    // get the season dates
    $spring = new DateTime('March 20');
    $summer = new DateTime('June 20');
    $fall = new DateTime('September 22');
    switch (true) {
        case $today >= $spring && $today < $summer:
            $report_semester = 'Spring';
            break;
    
        case $today >= $fall:
            $report_semester = 'Fall';
            break;
    
        default:
            $report_semester = 'Spring';
    
    }
    return $report_semester;
}

?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Hilger Portal - Report Cards</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            background: #f7fafc;
            font-family: InterVariable, -apple-system, system-ui, sans-serif;
            font-weight: 600;
            font-size: 18px;
        }

        main {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 20px;
            flex-direction: column;

        }

        .container {
            max-width: 1200px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        .logo {
            max-width: 100%;
            width: 150px;
        }

        .card {
            background: white;
            width: 75vw;
            margin-top: 20px;
            padding: 20px;
            border-color: #e2e8f0;
            box-shadow: 0px 0px 1pxrgba(48, 49, 51, 0.05), 0px 4px 8pxrgba(48, 49, 51, 0.1);
            border-radius: 15px;
        }

        ul {
            padding: 0;
            margin: 0;
        }

        li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 20px auto;
        }

        button {
            display: inline-flex;
            appearance: none;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            justify-content: center;
            user-select: none;
            position: relative;
            white-space: nowrap;
            vertical-align: middle;
            outline: transparent solid 2px;
            outline-offset: 2px;
            width: auto;
            line-height: 1.2;
            border-radius: 0.5rem;
            font-weight: var(--chakra-fontWeights-medium);
            transition-property: var(--chakra-transition-property-common);
            transition-duration: var(--chakra-transition-duration-normal);
            height: 2.5rem;
            min-width: 2.5rem;
            font-size: 1rem;
            padding-inline-start: 1rem;
            padding-inline-end: 1rem;
            background: #3182ce;
            color: #ffffff;
            border: none;
            cursor: pointer;
        }

        button:hover {
            background: white;
            color: #3182ce;
            border: 1px solid #3182ce;
        }

        a {
            text-decoration: none;
            color: unset;
        }

        .toast-wrapper {
            background: #2b6cb0;
            color: white;
            font-size: 18px;
            padding: 10px 20px;
            margin-bottom: 20px;
            border-radius: 0.5rem;
            display: none;
        }

        @media screen and (min-width: 792px) {
            body {
                font-size: 24px;
            }

            .logo {
                width: 300px;
            }

            main {
                padding: 100px;
            }

            .card {
                padding: 50px;
                width: 50vw;
            }

            li {
                margin: 50px auto;
            }

            .toast-wrapper {
                margin-bottom: 50px;
                text-align: center;
            }
        }
    </style>
</head>

<body>
    <main>
        <div class="toast-wrapper">
            <p>You currently have an outstanding balance on your 2021-2022 school year's tuition. You will not be able to see your student(s) report card(s) until your tuition is paid in full. If you think you have paid this in full, or if you have questions about your balance, please contact Eddy Hilger at <a href="tel:423-653-1333">423.653.1333</a>.</p>
        </div>
        <div class="container">
            <img src="../logo.png" class="logo" />
            <p>Use the links below to view grades for your students</p>
            <div class="card">
                <ul>
                    <?php foreach ($students as $student) : ?>
                        <?php
                        $query = $db_con->prepare('SELECT COUNT("id") FROM "Course" WHERE "Course".student = :student_id');
                        $query->bindParam(':student_id', $student["id"], PDO::PARAM_STR);
                        $query->execute();
                        $courses = $query->fetchAll(PDO::FETCH_ASSOC);
                        ?>
                        <?php
                        if ($courses[0]["count"] == 0) {
                        ?>
                            <li style="text-align: center;">
                                <?= $student['firstName'] . ' ' . $student['lastName'] . ' does not currently have any grades for this semester.' ?>
                            </li>
                        <?php
                        } else {
                        ?>
                            <li>
                                <?= $student['firstName'] . ' ' . $student['lastName'] ?><button><a href="/print.php?student=<?= $hashids->encode($student['id']) ?>" target="_blank">View Grades</a></button>
                            </li>
                        <?php
                        }
                        ?>
                    <?php endforeach ?>
                </ul>
            </div>
            <hr />
            <p>Previous Semesters</p>

            <div class="card">
                <?php
                foreach ($students as $student) {
                    $portal_id = $hashids->encode($student['id']);
                    $archive_files = $portal_id . ".pdf";
                    $reports = glob_recursive("../archived-reports", $archive_files, 1);
                    foreach ($reports as $semester) {

                        $semester_title = ucfirst(str_replace("-", " ", explode("/", $semester)[2]));
                        $current_semester = get_semester();
                        if ($semester_title != "{$current_semester} 2022") {
                ?>
                            <li>
                                <?= $student['firstName'] . ' ' . $student['lastName'] ?><button><a href="<?= $semester ?>" target="_blank"><?= $semester_title; ?></a></button>
                            </li>
                        <?php
                        }
                        ?>

                <?php
                    }
                }
                ?>
            </div>
        </div>
    </main>
</body>

</html>