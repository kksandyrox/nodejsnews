<?php  

include_once('database/medoo.php');

class Api {

	public $db = '';

	public $database_config = array(
			'database_type' => 'mysql',
			'database_name' => 'news',
			'server' => 'localhost',
			'username' => 'root',
			'password' => '',
			'charset' => 'utf8'
		);    


	public function __construct() {
		$this->db = new Medoo($this->database_config);
	}

	/**
	 * @return list of sources	
	 */
	public function sources() {
		$sources = $this->db->select('sources', array(
			'id', 'name', 'code'
			)
		);
		header('Content-Type: application/json');
		echo json_encode($sources);
	}

	/**
	 * @return list of categories	
	 */
	public function catergories() {

	}

	/**
	 * @return list of sorts i.e top/latest/popular	
	 */
	public function sorts() {

	}

	/**
	 * @return get News from X source(s)	
	 */
	public function sourceNews($source) {
		$sourceNews = $this->db->select('news', '*', ["source_id" => $source]);
		header('Content-Type: application/json');
		echo json_encode($sourceNews);
	}

	/**
	 * @return Get News from Y categories(s)
	 */
	public function categoryNews($category) {
		$categoryNews = $this->db->select('news', '*', ['category_id' => $category]);
		header('Content-Type: application/json');
		echo json_encode($categoryNews);
	}

	/**
	 * @param sort (top, latest, popular)
	 * @return 	Get News of 1 or more sorts
	 */
	public function sortNews() {

	}

	/**
	 * @return Get News of X source(s) and Y categories(s)	
	 */
	public function sourceCategoryNews() {

	}

	/**
	 * @return Get News of X sources(s) and 1 or more sorts	
	 */
	public function sortSourceNews() {

	}

	/**
	 * @return Get News of Y categories(s) and 1 or more sorts
	 */
	public function sortCategoryNews() {

	}

	/**
	 * @return Get all news. 
	 * TODO write JUMBLE algorithm	
	 */
	public function news() {

	}
}



$api = new Api();

$urlParams = explode('/', $_GET['request']);

$method = !empty($urlParams[0]) ? $urlParams[0] : '';
$param = !empty($urlParams[1]) ? $urlParams[1] : '';

switch ($method) {
	case 'sources':
		$api->sources();
		break;

	case 'sourceNews':
		$api->sourceNews($param);
		break;

	case 'categoryNews':
		$api->categoryNews($param);
		break;

	default:
		# code...
		break;
}

?>