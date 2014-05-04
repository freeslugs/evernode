//The API of your application

module.exports = {
  "get_para_sim_score"         : get_para_sim_score
  "merge_doc_into_lecture"     : merge_doc_into_lecture
  "construct_lecture_from_doc" : construct_lecture_from_doc
}

//Turn doc into array of arrays
function construct_lecture_from_doc(doc) {
  //Function input args example
  //doc = "here is one paragraph.\n\nhere is a second paragraph.\n\nhere is a third paragraph.";
  
  //Array of paras
  doc_arr = doc.split( "\n\n" );
  
  //Form out arr
  doc_arr_arr   = [];
  doc_len       = doc_arr.length;
  for(i=0;i<doc_len;i++) {
    doc_arr_arr[i] = [doc_arr[i]];
  }
  
  return doc_arr_arr
}

function get_para_sim_score(para1, para2) {
  //Function input args example
  //para1 = 'The national railroad network was completed with the work of Chinese immigrants and large-scale mining and factories industrialized the Northeast and Midwest.';
  //para2 = 'The national railroad network was completed with the work of Chinese and Japanese.';
  
  //Import natural package
  var natural = require('natural');
  tokenizer = new natural.WordTokenizer();
  
  //Tokenize
  para1_arr = tokenizer.tokenize(para1.toLowerCase());
  para2_arr = tokenizer.tokenize(para2.toLowerCase());
  
  //Stop words
  stop_words = natural.stopwords;
  
  //Remove stop words
  para1_arr = para1_arr.filter(function(x) { return stop_words.indexOf(x) < 0 });
  para2_arr = para2_arr.filter(function(x) { return stop_words.indexOf(x) < 0 });
  
  //Filter unique words
  function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
  }
  
  para1_arr = para1_arr.filter( onlyUnique );
  para2_arr = para2_arr.filter( onlyUnique );
  
  //Compute score as number of unique words in both divided by total number of unique words
  identical_wrds_arr  = para1_arr.filter(function(n) { return para2_arr.indexOf(n) != -1 });
  intersect_uniq_wrds = identical_wrds_arr.length;
  
  para_combo_arr    = para1_arr.concat(para2_arr);
  para_combo_arr    = para_combo_arr.filter( onlyUnique );
  total_uniq_words  = para_combo_arr.length;
  
  score = intersect_uniq_wrds/total_uniq_words;
  return score;
}

function merge_doc_into_lecture(lec1, doc2) {
  //Array of paras
  lec2 = construct_lecture_from_doc(doc2);
  
  //Identify longer document
  lec1_num_paras = lec1.length;
  lec2_num_paras = lec2.length;
  
  if (lec1_num_paras > lec2_num_paras) {
    lec_l = lec1;
    lec_s = lec2;
  } else {
    lec_l = lec2;
    lec_s = lec1;
  }
  
  //Form out arr
  out_arr   = lec_l;
  
  //Iterate over shorter doc and map to longer paras
  lec_s_len = lec_s.length;
  lec_l_len = lec_l.length;
  for(i=0;i<lec_s_len;i++) {
    shorter_lec_para = lec_s[i][0];
    sim_scores       = [];
    
    for(j=0;j<lec_l_len;j++) {
      longer_lec_para = lec_l[j][0];
      sim_score       = get_para_sim_score(shorter_lec_para, longer_lec_para);
      sim_scores.push(sim_score);
    }
    
    var ind_max = sim_scores.indexOf(Math.max.apply(Math, sim_scores));
    out_arr[ind_max].push(shorter_lec_para);
  }
  
  //Out array is array of arrays - each array is a nodeset, containing nodes (paragraphs)
  return out_arr;
}

