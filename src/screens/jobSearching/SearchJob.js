
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
const SearchJob = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('')
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [noResults, setNoResults] = useState(false)

  // Function to search for jobs in Firestore
  const searchJobs = async (txt) => {
    setLoading(true);
    setNoResults(false);
    try {
      let query = firestore().collection("jobs");
      if (txt && txt.trim() !== '') {
        query = query.where("jobTitle", "==", txt.trim());
      }
      const snapShot = await query.get();

      const jobData = snapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setJobs(jobData);
      setNoResults(jobData.length === 0 && txt.trim() !== '');

    } catch (error) {
      console.error("Error fetching jobs: ", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  // Fetch all jobs on component mount
  useEffect(() => {
    searchJobs(''); // Call with an empty string to fetch all jobs initially
  }, []);

  // Render a single job item
  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.jobItem} onPress={() => navigation.navigate('JobDetails', { data: item })}>
      <View>
        <Text style={styles.jobTitleText}>{item.jobTitle}</Text>
        <Text style={styles.jobDetailText}>Company: {item.company}</Text>
        <Text style={styles.jobDetailText}>Skills: {item.skill}</Text>
        <Text style={styles.jobDetailText}>Experience: {item.experience} years</Text>
        <Text style={styles.jobDescText}>{item.jobDesc}</Text>
      </View>
      <TouchableOpacity>
        <Image source={require('../../assetsts/images/star.png')} style={{ width: scale(12), height: scale(12), marginTop: moderateVerticalScale(5) }} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar UI */}
      <View style={styles.searchBox}>
        <Image source={require('../../assetsts/images/search1.png')} style={styles.icon} />
        <TextInput
          placeholderTextColor={'#9e9e9e'}
          placeholder='Search Job here ...'
          style={styles.input}
          value={search}
          onChangeText={txt => {
            setSearch(txt);
            searchJobs(txt);
          }}
        />
        {search !== '' && (
          <TouchableOpacity onPress={() => {
            setSearch('');
            searchJobs('');
          }}>
            <Image source={require('../../assetsts/images/remove.png')} style={styles.close} />
          </TouchableOpacity>
        )}
      </View>

      {/* Conditional Rendering based on state */}
      {loading && <Text style={styles.statusText}>Searching for jobs...</Text>}
      {noResults && <Text style={styles.statusText}>No jobs found for "{search}".</Text>}
      {jobs.length > 0 && !loading && (
        <FlatList
          data={jobs}
          renderItem={renderJobItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  )
}

export default SearchJob

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingHorizontal: moderateScale(10),
  },
  searchBox: {
    width: '100%',
    height: verticalScale(45),
    borderWidth: 0.4,
    marginTop: moderateVerticalScale(20),
    borderRadius: moderateScale(30),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  icon: {
    width: scale(18),
    height: scale(18),
  },
  input: {
    flex: 1, // Allow input to take up available space
    height: '100%',
    marginLeft: moderateScale(10),
    fontSize: moderateScale(16),
    color: TEXT_COLOR,
  },
  close: {
    width: scale(18),
    height: scale(18),
  },
  flatListContent: {
    paddingBottom: moderateVerticalScale(20),
  },
  jobItem: {
    width: '100%',
    padding: moderateScale(15),
    backgroundColor: '#fff',
    marginTop: moderateScale(15),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: moderateScale(10)
  },
  jobTitleText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#333',
  },
  jobDetailText: {
    fontSize: moderateScale(14),
    color: '#666',
    marginTop: moderateVerticalScale(5),
  },
  jobDescText: {
    fontSize: moderateScale(12),
    color: '#999',
    marginTop: moderateVerticalScale(5),
  },
  statusText: {
    textAlign: 'center',
    marginTop: moderateVerticalScale(20),
    fontSize: moderateScale(16),
    color: '#888',
  }
})