<?php

require_once ('./fpdf.php');
require_once('./vendor/autoload.php');
require ('./db-config.php');
use Hashids\Hashids;

$hashids = new Hashids('7CQxaV8ksmBBKNKKytddNRuKUk3C0S', 5);

/* This script is designed to print report cards for teachers/administrators.  If a student id is passed to the 'print' parameter, then only a report
*  for that student will be printed.  Else, we pass in the 'all' parameter and all reports are printed.*/
class PDF extends FPDF

    {
    var $custom_number = 1;
    var $student = null;

    // Page header

    function Header()
        {
        if ($this->getPageNumber() == 1)
            {

            // Logo

            $this->Image('./static/grade_print_logo.jpg', 10, 6, 45);
            $this->SetFont('Arial', 'B', 14);

            // Move to the right

            $this->Cell(100);

            // Title
                        $today = new DateTime();

                        // get the season dates
                        $spring = new DateTime('March 20');
                        $summer = new DateTime('June 20');
                        $fall = new DateTime('September 22');
                        $winter = new DateTime('December 21');

                        switch(true) {
                                case $today >= $spring && $today < $summer:
                                        $report_semester = 'Spring';
                                        break;

                                case $today >= $fall && $today < $winter:
                                        $report_semester = 'Fall';
                                        break;

                                default:
                                        $report_semester = 'Spring';
                        }
            $report_year = date("Y");
            $report_title = "Hilger Higher Learning Report Card " . $report_semester . " Semester " . $report_year;

            $this->Cell(30, 5, $report_title, 0, 1, 'C');
            $this->Ln(10);

            // Set font for subtitle

            $this->SetFont('Times', '', 12);
            $this->Cell(80);
            $this->Cell(30, 8, 'Hilger Higher Learning, Inc.', 0, 1, 'C');
            $this->Cell(80);
            $this->Cell(30, 8, '412 East and West Road', 0, 1, 'C');
            $this->Cell(80);
            $this->Cell(30, 8, 'Lookout Mountain, TN 37350', 0, 1, 'C');
            $this->Cell(80);
            $this->Cell(30, 8, 'www.hhlearning.com', 0, 1, 'C');

            // Line break

            $this->Ln(20);
            }
          else
            {
            $this->SetFont('Times', 'I', 8);
            $this->Cell(150);
            $this->Cell(30, 8, 'Page : ' . $this->getPageNumber() , 0, 1, 'R');
            }
        }

    // Page footer

    function Footer()
        {

        // Position at 1.5 cm from bottom

        $this->SetY(-15);
        $this->SetFont('Times', 'I', 8);

        // Page number
        // $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');

        $this->Cell(0, 10, 'Hilger Higher Learning', 0, 0, 'C');
        $this->Cell(0, 10, 'Report Card for ' . $this->getStudent() , 0, 0, 'R');
        }

    function setPageNumber($number)
        {
        $this->custom_number = $number;
        }

    function getPageNumber()
        {
        return $this->custom_number;
        }

    function customAddPage()
        {
        $this->AddPage();
        $this->setPageNumber(1);
        }

    function AcceptPageBreak()
        {

        // Override this function to keep track of page numbers for students

        $page_number = $this->getPageNumber();
        $page_number++;
        $this->setPageNumber($page_number);
        return $this->AutoPageBreak;
        }

    function getStudent()
        {
        return $this->student;
        }

    function setStudent($student)
        {
        $this->student = $student;
        }
    }

if (isset($_REQUEST['student']) && $_REQUEST['student'] === 'YyaBPKJcQ8PQ1qJ2kYui')
    {

    // Select all students from and courses from the database, put the courses in order of student id and bring in teacher names as well

    $statement = $db_con->prepare('SELECT "User".name as teacher,
            "Course".name AS "cName",
            "Course".id AS "cId",
            "Course".grade AS "cGrade",
            "Course".feedback AS "cFeedback",
            "Student"."firstName" AS "sFirst",
            "Student"."lastName" AS "sLast",
            "Student".id AS "sId"
                FROM "Course"
                    INNER JOIN "User" on "Course"."teacher" = "User".id
                    INNER JOIN "Student" on "Course"."student" = "Student".id
                        ORDER BY "Course".student');
    $statement->execute();
    }
  else
    {
    $student_id = $hashids->decode($_REQUEST['student'])[0];
    $statement = $db_con->prepare('SELECT "User".name as teacher,
            "Course".name AS "cName",
            "Course".id AS "cId",
            "Course".grade AS "cGrade",
            "Course".feedback AS "cFeedback",
            "Student"."firstName" AS "sFirst",
            "Student"."lastName" AS "sLast",
            "Student".id AS "sId"
                FROM "Course"
                    INNER JOIN "User" on "Course"."teacher" = "User".id
                    INNER JOIN "Student" on "Course"."student" = "Student".id
                        WHERE "Course".student = :student_id
                            ORDER BY "Course".student');
    $statement->bindParam(':student_id', $student_id, PDO::PARAM_STR);
    $statement->execute();


    }


$student = $statement->fetchAll(PDO::FETCH_ASSOC);

// echo '<pre>';
// var_dump($student);
$pdf = new PDF();

if ($student)
    {

    // Set an initial variable for our student id.  We will check this on each iteration of the foreach loop to determine if we need to move
    // onto the next student or not.  We update this at the end of each iteration using the current student_id.

    // $pdf->customAddPage();
    $pass = 0;
    foreach($student as $row)
        {

        // Check to see if we are still working on the same student as in the previous loop.  If so, no need to start a new page.

        if ($current_student === $row['sId'])
            {
            $student = $row['sFirst'] . ", " . $row['sLast'];
            $student_header = $row['sFirst'] . " " . $row['sLast'];
            $pdf->setStudent($student);
            $pdf->SetFont('Times', '', 10);
            $intro = $student_header . " has received the following  percentage grade(s) for one " . "semester of class(es) administered by Hilger Higher Learning, Inc. All instructors contracted by Hilger " . "Higher Learning meet proper Certification and/or requirement standards as directed by Tennessee, Georgia, " . "and Alabama state law. Each semester of class is worth 1/2 credit.";
            $pdf->Cell(10);
            if ($pass === 0)
                {
                $pdf->Write(5, $intro);
                $i = 1;
                $pdf->Ln(1);
                }

            $pdf->Ln(5);

            // echo $next_course;

            if (!empty($row['cName']))
                {
                $pdf->SetFont('Times', 'B', 10);
                $pdf->Cell(10);
                $course = "Course: " . $row['cName'];
                $course = iconv('UTF-8', 'windows-1252', trim($course));
                $pdf->Cell(0, 5, $course, 0, 1, 'L');
                $pdf->Ln(1);
                $pdf->Cell(10);
                $grade = "Grade: " . $row['cGrade'];
                $grade = iconv('UTF-8', 'windows-1252', trim($grade));
                $pdf->Cell(0, 5, $grade, 0, 1, 'L');
                $pdf->Ln(1);
                $pdf->Cell(10);
                $teacher = "Instructor: " . $row['teacher'];
                $teacher = trim($teacher);
                $teacher = iconv('UTF-8', 'windows-1252', ucwords($teacher));
                $pdf->Cell(0, 5, $teacher, 0, 1, 'L');
                $pdf->Ln(1);
                $pdf->SetFont('Times', '', 10);
                $pdf->Cell(10);
                $feedback = trim($row['cFeedback']);
                $feedback = iconv('UTF-8', 'windows-1252', $feedback); //Ensure that were getting correct punctation in the pdf output.  Without this punctuation will be converted to funky characters.
                $pdf->Write(5, $feedback);
                $pdf->Ln(10);
                $current_student = $row['sId'];
                };
            }
          else
            { //If we are moving onto the next student, we need to add a new page.
            $pdf->customAddPage();
            $student = $row['sFirst'] . ", " . $row['sLast'];
            $student_header = $row['sFirst'] . " " . $row['sLast'];
            $pdf->setStudent($student);
            $pdf->SetFont('Times', '', 10);
            $intro = $student_header . " has received the following  percentage grade(s) for one " . "semester of class(es) administered by Hilger Higher Learning, Inc. All instructors contracted by Hilger " . "Higher Learning meet proper Certification and/or requirement standards as directed by Tennessee, Georgia, " . "and Alabama state law. Each semester of class is worth 1/2 credit.";
            $pdf->Cell(10);
            $pdf->Write(5, $intro);
            $i = 1;
            $pdf->Ln(5);

            // code...                        $pdf->Ln(5);
            // echo $next_course;

            if (!empty($row['cName']))
                {
                $pdf->SetFont('Times', 'B', 10);
                $pdf->Cell(10);
                $course = "Course: " . $row['cName'];
                $course = iconv('UTF-8', 'windows-1252', trim($course));
                $pdf->Cell(0, 5, $course, 0, 1, 'L');
                $pdf->Ln(1);
                $pdf->Cell(10);
                $grade = "Grade: " . $row['cGrade'];
                $grade = iconv('UTF-8', 'windows-1252', trim($grade));
                $pdf->Cell(0, 5, $grade, 0, 1, 'L');
                $pdf->Ln(1);
                $pdf->Cell(10);
                $teacher = "Instructor: " . $row['teacher'];
                $teacher = trim($teacher);
                $teacher = iconv('UTF-8', 'windows-1252', ucwords($teacher));
                $pdf->Cell(0, 5, $teacher, 0, 1, 'L');
                $pdf->Ln(1);
                $pdf->SetFont('Times', '', 10);
                $pdf->Cell(10);
                $feedback = trim($row['cFeedback']);
                $feedback = iconv('UTF-8', 'windows-1252', $feedback); //Ensure that were getting correct punctation in the pdf output.  Without this punctuation will be converted to funky characters.
                $pdf->Write(5, $feedback);
                $pdf->Ln(10);
                $current_student = $row['sId'];
                };
            };
        $pdf->setPageNumber(1); //Reset page counter
            $pass++;
        }
    }

$pdf->AliasNbPages();
$pdf->SetTitle('Hilger Higher Learning - All Grade Reports');
$pdf->Output();
mkdir("./archived-reports/spring-2022", 0770, true);

$pdf->Output('F', "./archived-reports/spring-2022/" . $_REQUEST["student"] . ".pdf");
