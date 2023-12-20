<?php 
require_once("backend.php");
class chart extends backend
{
    public function chartDaily(){
        return self::myChartDaily();
    }
    public function chartToday(){
        return self::myChartToday();
    }
    public function chartMonthly(){
        return self::myChartMonthly();
    }
    public function chartMonthlySelect($selectedMonth){
        return self::getChartMonthlySelect($selectedMonth);
    }

        
    private function myChartToday(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->chartTodayQuery());
                $stmt->execute(array());
                $result = $stmt->fetchAll();
                $database->closeConnection();
                return json_encode($result);
            }else{
                return "403";
            }
        
        } catch (PDOException $th) {
            //throw $th;
            return "501";
        }
    }


    private function myChartDaily(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->chartDailyQuery());
                $stmt->execute(array());
                $result = $stmt->fetchAll();
                $database->closeConnection();
                return json_encode($result);
            }else{
                return "403";
            }
        
        } catch (PDOException $th) {
            //throw $th;
            return "501";
        }
    }

    private function myChartMonthly(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->chartMonthlyQuery());
                $stmt->execute(array());
                $result = $stmt->fetchAll();
                $database->closeConnection();
                return json_encode($result);
            }else{
                return "403";
            }
        
        } catch (PDOException $th) {
            //throw $th;
            return "501";
        }
    }

    private function getChartMonthlySelect($selectedMonth){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->getChartMonthlySelectQuery());
                $stmt->execute(array($selectedMonth));
                $result = $stmt->fetchAll();
                $database->closeConnection();
                return json_encode($result);
            }else{
                return "403";
            }
        
        } catch (PDOException $th) {
            //throw $th;
            return "501";
        }
    }


    private function chartTodayQuery() {
        return "SELECT p.pname, o.Date, SUM(total) AS combined_total FROM products p LEFT JOIN ( SELECT DATE_FORMAT(STR_TO_DATE(o.created, '%l:%i:%p - %Y/%m/%d'), '%M %e, %Y') AS Date, o.product_id, SUM(o.total_amount) AS total FROM orders o WHERE o.o_delivery = 'complete' AND DATE(STR_TO_DATE(o.created, '%l:%i:%p - %Y/%m/%d')) = CURDATE() GROUP BY Date, o.product_id UNION SELECT DATE_FORMAT(STR_TO_DATE(r.created, '%l:%i:%p - %Y/%m/%d'), '%M %e, %Y') AS Date, r.product_id, SUM(r.r_total_amount) AS total FROM reserves r WHERE r.r_delivery = 'complete' AND DATE(STR_TO_DATE(r.created, '%l:%i:%p - %Y/%m/%d')) = CURDATE() GROUP BY Date, r.product_id ) AS o ON p.product_id = o.product_id GROUP BY pname, Date HAVING combined_total IS NOT NULL;";   
    }
    private function chartDailyQuery() {
        return "SELECT Date, SUM(total) AS combined_total FROM ( SELECT DATE_FORMAT(STR_TO_DATE(created, '%l:%i:%p - %Y/%m/%d'), '%M %e, %Y') AS Date, SUM(total_amount) AS total FROM orders WHERE o_delivery = 'complete' GROUP BY Date UNION SELECT DATE_FORMAT(STR_TO_DATE(created, '%l:%i:%p - %Y/%m/%d'), '%M %e, %Y') AS Date, SUM(r_total_amount) AS total FROM reserves WHERE r_delivery = 'complete' GROUP BY Date ) AS combined_data GROUP BY Date;";  
    }
    private function chartMonthlyQuery() {
        return "SELECT Date, SUM(total) AS combined_total FROM ( SELECT DATE_FORMAT(STR_TO_DATE(created, '%l:%i:%p - %Y/%m/%d'), '%M %Y') AS Date, SUM(total_amount) AS total FROM orders WHERE o_delivery = 'complete' GROUP BY Date UNION SELECT DATE_FORMAT(STR_TO_DATE(created, '%l:%i:%p - %Y/%m/%d'), '%M %Y') AS Date, SUM(r_total_amount) AS total FROM reserves WHERE r_delivery = 'complete' GROUP BY Date ) AS combined_data GROUP BY Date;";  
    }
    private function getChartMonthlySelectQuery() {
        return "SELECT Date, SUM(total) AS combined_total FROM ( SELECT DATE_FORMAT(STR_TO_DATE(created, '%l:%i:%p - %Y/%m/%d'), '%M') AS Date, SUM(total_amount) AS total FROM orders WHERE o_delivery = 'complete' GROUP BY Date UNION SELECT DATE_FORMAT(STR_TO_DATE(created, '%l:%i:%p - %Y/%m/%d'), '%M') AS Date, SUM(r_total_amount) AS total FROM reserves WHERE r_delivery = 'complete' GROUP BY Date ) AS combined_data WHERE DATE = ? GROUP BY Date;";
    }
    
    
}