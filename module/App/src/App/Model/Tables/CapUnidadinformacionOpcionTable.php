<?php
namespace App\Model\Tables;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Debug\Debug;
use Zend\Db\Sql\Expression;

class CapUnidadinformacionOpcionTable extends AbstractTableGateway
{
    protected $table = 'cap_unidadinformacion_opcion';
    
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
    
    
    public function getOpcion($oid = 0){
        $where = array('uni_inf_opc_id' => $oid);
        $resultSet = $this->select($where);
        if ($resultRow = $resultSet->toArray()){
        	return $resultRow[0];
        }else {
        	return array();
        }
    }
    
    
}

?>