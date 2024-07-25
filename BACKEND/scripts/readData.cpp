// allows querying the pokemon dataset that is stored in the form of csv
// cmd args are 1: fieldname (name, type1, etc.), value, and a boolean
// that when set to false , will give you all results that match the 
// aforementioned desc, when st to true, will only yield the FIRST result
// that matches the desc

#include<iostream>
#include<vector>
#include<fstream>
#include<map>
#include<algorithm>

using namespace std;
// const string FILEPATH = "./dataset/pokemon.csv";

string getLineByNumber(unsigned short int line_no, const string filepath) {

    if (line_no == 0) return "Line no must be > 0";

    // trying to open the file
    ifstream fh(filepath);
    if (!fh) {
        return "Error opening the file";
    }

    // reading lines from the file
    string curr_line;
    unsigned int index = 1;
    while (index <= line_no) {
        if (fh.eof()) return "EOF";
        getline(fh, curr_line);
        // cout << curr_line << endl;
        index += 1;
    }

    return curr_line;
}

vector<string> splitByComma(const string csv) {

    vector<char> curr_key;
    vector<string> ret_this;
    bool quotes_flag = false;

    for (unsigned short int i = 0; i < csv.length(); i++) {
        if (csv[i] != ',') {
            if (csv[i] != '\"') curr_key.push_back(csv[i]);
            else quotes_flag = !quotes_flag;
        }
        else {
            if (!quotes_flag) {
                ret_this.push_back(string(curr_key.begin(), curr_key.end()));
                curr_key.clear();
            }
        }
    }

    return ret_this;
}

vector<string> getKeys(const string filepath) {return splitByComma(getLineByNumber(1, filepath));}

unsigned int findStringInVector(const string s, const vector<string> v) {
    auto it = find(v.begin(), v.end(), s);
    return distance(v.begin(), it);
}

vector<map<string, string>> queryForRecord(const pair<string, string> request, const string filepath, bool onlyFirstResult=true) {
    
    vector<string> keys = getKeys(filepath);
    vector<vector<string>> vals_vect;

    unsigned int key_index = findStringInVector(request.first, keys);

    unsigned int line_no = 1;
    string curr_line;
    vector<string> curr_vals;
    
    while (line_no < 803) {
        curr_line = getLineByNumber(line_no, filepath);
        if (curr_line == "EOF" || curr_line == "Out of range") break;
        curr_vals = splitByComma(curr_line);
        if (curr_vals.at(key_index) == request.second) {
            vals_vect.push_back(curr_vals);
            if (onlyFirstResult) break;
        }
        line_no++;
    }

    vector<map<string, string>> ret_this;
    for (vector<string> val: vals_vect) {
        
        map<string, string> push_this;
        for (string s: val) {
            push_this.insert(pair<string, string>(keys.at(findStringInVector(s, val)), s));
        }
        
        ret_this.push_back(push_this);
    }

    return ret_this;
}

map<string, string> getRecordByName(const string name, const string filepath) {
    
    vector<string> keys = getKeys(filepath);
    vector<string> vals;

    unsigned short int line_no = 1;
    
    vector<string> curr_vals;
    string curr_line;
    const int indexOfName = findStringInVector("name", keys);
    while (1) {
        curr_line = getLineByNumber(line_no, filepath);
        if (curr_line == "EOF" || curr_line == "Out of range") break;

        curr_vals = splitByComma(curr_line);
        if (curr_vals.at(indexOfName) == name) {
            // vals_vector.push_back(curr_vals);
            vals = curr_vals;
            break;
        }

        line_no++;
    }
    
    map<string, string> ret_this;
    for (string s: keys) {
        ret_this.insert(pair<string, string>(s, vals.at(findStringInVector(s, keys))));
    }

    return ret_this;
}

void displayRecord(map<string, string> record) {
    for (pair<string, string> row: record) {
        cout << row.first << ":" << row.second << ",";
    }
    cout << endl;
    return;
}

string getArgumentAsString(char* cmd_arg_ptr) {
    string ret_this = "";
    char* curr_ptr = cmd_arg_ptr;
    while (*curr_ptr != '\0') {
        ret_this.push_back(*curr_ptr);
        curr_ptr++;
    }
    return ret_this;
}

int main(int argc, char* argv[]) {
    // cout << getLineByNumber(1, FILEPATH) << endl;
    // for (string s: splitByComma(getLineByNumber(1, FILEPATH))) {
    //     cout << s << endl;
    // }
    // for (string s: getKeys(FILEPATH)) {
    //     cout << s << endl;
    // }

    string field = getArgumentAsString(argv[1]);
    string value = getArgumentAsString(argv[2]);
    bool getFirst = (getArgumentAsString(argv[3]) == "0") ? false : true;
    string filepath = getArgumentAsString(argv[4]);

    
    // cout << "FIELD: " << field << endl;
    // cout << "VALUE: " << value << endl;
    // cout << "GETFIRST: " << getFirst << endl;
    // cout << "FILEPATH: " << filepath << endl;

    // char* curr_ptr = argv[2];
    // while (*curr_ptr != '\0') {
    //     field.push_back(*curr_ptr);
    //     curr_ptr++;
    // }

    // string value = "";
    // curr_ptr = argv[3];
    // while (*curr_ptr != '\0') {
    //     value.push_back(*curr_ptr);
    //     curr_ptr++;
    // }

    // GETTING RECORD BY ANY ATTRIBUTE ------------------------------------------
    const vector<map<string, string>> record = queryForRecord(pair<string, string>(field, value), filepath, getFirst);
    for (map<string, string> mp: record) {
        displayRecord(mp);
    }


    // GETTING RECORD BY NAME OF POKEMON ----------------------------------------
    // const map<string, string> record = getRecordByName("Charmander", FILEPATH);
    // for (pair<string, string> pair: record) {
    //     cout << pair.first << "\t\t\t" << pair.second << endl;
    // }
    // return 0;
}