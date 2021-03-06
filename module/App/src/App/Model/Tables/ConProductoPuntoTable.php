<?php
namespace App\Model\Tables;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Debug\Debug;
use Zend\Db\Sql\Expression;

class ConProductoPuntoTable extends AbstractTableGateway
{
    protected $table = 'consumo_productopunto';
    
    public function __construct()
    {
    	//$this->adapter = $adapter;
    	//$this->initialize();
    
    	$this->featureSet = new Feature\FeatureSet();
    	$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }
    
    
    public function fetchAll()
    {
    	return $resultSet->toArray();
    }
    
    
    public function getProductos($pid = 0){
        $where = array('pun_sucursal_id' => $pid);
        if ( $pid > 0 ) {
            $resultSet = $this->select($where);
        }else {
            $resultSet = array();
        }
        if ($resultRow = $resultSet->toArray()){
        	return $resultRow;
        }else {
        	return array();
        }
    }
    
    
}

?>