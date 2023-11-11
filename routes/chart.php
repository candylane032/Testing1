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

    private function chartTodayQuery() {
        return "SELECT r.r_delivery AS delivery, r.product_id AS product_id, SUM(r.reserve_kilo) AS reserve_kilo, p.pname AS pname, DATE_FORMAT(STR_TO_DATE(r.created, '%l:%i:%p - %Y/%m/%d'), '%M %e, %Y') AS Date FROM reserves r JOIN products p ON r.product_id = p.product_id WHERE r.r_delivery = 'complete' GROUP BY pname, DATE HAVING Date = DATE_FORMAT(CURDATE(), '%M %e, %Y');";   
    }
    private function chartDailyQuery() {
        return "SELECT SUM(reserve_kilo) AS reserve_kilo, DATE_FORMAT(STR_TO_DATE(created, '%l:%i:%p - %Y/%m/%d'), '%M %e, %Y') AS Date, r_delivery FROM reserves WHERE r_delivery = 'complete' GROUP BY Date;";  
    }
    private function chartMonthlyQuery() {
        return "SELECT r.r_delivery AS delivery, r.product_id AS product_id, SUM(r.reserve_kilo) AS reserve_kilo, p.pname AS pname, DATE_FORMAT(STR_TO_DATE(r.created, '%l:%i:%p - %Y/%m/%d'), '%M %Y') AS Date FROM reserves r JOIN products p ON r.product_id = p.product_id WHERE r.r_delivery = 'complete' GROUP BY Date;";  
    }
}