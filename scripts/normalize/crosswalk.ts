/**
 * Validated Geographic Crosswalk for Lending Pulse
 * 
 * Maps sales branches to validated States, Districts, and Geographic coordinates.
 * Also provides normalized State and District mappings for Collections (including Delhi NCR handling).
 */

export interface BranchLocation {
  branch: string;
  state: string;
  district: string;
  lat: number;
  lng: number;
  zone?: string;
  geo?: string;
}

export const BRANCH_CROSSWALK: Record<string, { state: string; district: string; lat: number; lng: number }> = {
  'ALWAR': { state: 'Rajasthan', district: 'Alwar', lat: 27.5530, lng: 76.6346 },
  'ATTUR': { state: 'Tamil Nadu', district: 'Salem', lat: 11.5989, lng: 78.5986 },
  'BAGALKOT': { state: 'Karnataka', district: 'Bagalkot', lat: 16.1691, lng: 75.6615 },
  'BAHADURGARH': { state: 'Haryana', district: 'Jhajjar', lat: 28.6924, lng: 76.9240 },
  'BALESWAR': { state: 'Odisha', district: 'Balasore', lat: 21.4934, lng: 86.9135 },
  'BAREILLY': { state: 'Uttar Pradesh', district: 'Bareilly', lat: 28.3670, lng: 79.4304 },
  'BATHINDA': { state: 'Punjab', district: 'Bathinda', lat: 30.2110, lng: 74.9455 },
  'BELGAUM': { state: 'Karnataka', district: 'Belagavi', lat: 15.8497, lng: 74.4977 },
  'BENGALURU - MUSEUM ROAD': { state: 'Karnataka', district: 'Bengaluru Urban', lat: 12.9716, lng: 77.6062 },
  'BENGALURU - NELAMANGALA': { state: 'Karnataka', district: 'Bengaluru Rural', lat: 13.0973, lng: 77.3910 },
  'BENGALURU - RAJAJI NAGAR': { state: 'Karnataka', district: 'Bengaluru Urban', lat: 12.9982, lng: 77.5530 },
  'BILASPUR': { state: 'Chhattisgarh', district: 'Bilaspur', lat: 22.0797, lng: 82.1409 },
  'BURARI': { state: 'Delhi', district: 'North Delhi', lat: 28.7532, lng: 77.2001 },
  'CHENNAI - KODAMBAKKAM': { state: 'Tamil Nadu', district: 'Chennai', lat: 13.0519, lng: 80.2241 },
  'CHENNAI - NORTH BOAG ROAD': { state: 'Tamil Nadu', district: 'Chennai', lat: 13.0418, lng: 80.2341 },
  'DEHRADUN': { state: 'Uttarakhand', district: 'Dehradun', lat: 30.3165, lng: 78.0322 },
  'DELHI - LAXMI NAGAR': { state: 'Delhi', district: 'East Delhi', lat: 28.6304, lng: 77.2773 },
  'DELHI - ROHINI': { state: 'Delhi', district: 'North West Delhi', lat: 28.7495, lng: 77.0565 },
  'DEORIA': { state: 'Uttar Pradesh', district: 'Deoria', lat: 26.5024, lng: 83.7791 },
  'DHANBAD - BANK MORE': { state: 'Jharkhand', district: 'Dhanbad', lat: 23.7957, lng: 86.4304 },
  'DHAR': { state: 'Madhya Pradesh', district: 'Dhar', lat: 22.5984, lng: 75.3023 },
  'DURG - BHILAI POWER HOUSE': { state: 'Chhattisgarh', district: 'Durg', lat: 21.1904, lng: 81.2849 },
  'ETAWAH': { state: 'Uttar Pradesh', district: 'Etawah', lat: 26.7769, lng: 79.0238 },
  'FARIDABAD': { state: 'Haryana', district: 'Faridabad', lat: 28.4089, lng: 77.3178 },
  'GHAZIABAD - RAJ NAGAR': { state: 'Uttar Pradesh', district: 'Ghaziabad', lat: 28.6790, lng: 77.4470 },
  'GUNTUR - NARASARAOPETA': { state: 'Andhra Pradesh', district: 'Guntur', lat: 16.2359, lng: 80.0499 },
  'HARDOI - LUCKNOW ROAD': { state: 'Uttar Pradesh', district: 'Hardoi', lat: 27.3949, lng: 80.1292 },
  'HOSPET': { state: 'Karnataka', district: 'Vijayanagara', lat: 15.2689, lng: 76.3909 },
  'HYDERABAD - HIMAYAT NAGAR': { state: 'Telangana', district: 'Hyderabad', lat: 17.4022, lng: 78.4842 },
  'HYDERABAD - SOMAJIGUDA': { state: 'Telangana', district: 'Hyderabad', lat: 17.4265, lng: 78.4578 },
  'INDORE - MG ROAD': { state: 'Madhya Pradesh', district: 'Indore', lat: 22.7196, lng: 75.8577 },
  'INDORE - VIJAY NAGAR': { state: 'Madhya Pradesh', district: 'Indore', lat: 22.7533, lng: 75.8937 },
  'JAIPUR - KALWAR ROAD': { state: 'Rajasthan', district: 'Jaipur', lat: 26.9388, lng: 75.7330 },
  'JAIPUR - TONK ROAD': { state: 'Rajasthan', district: 'Jaipur', lat: 26.8530, lng: 75.8050 },
  'JALANDHAR': { state: 'Punjab', district: 'Jalandhar', lat: 31.3260, lng: 75.5762 },
  'JALGAON': { state: 'Maharashtra', district: 'Jalgaon', lat: 21.0077, lng: 75.5626 },
  'KANPUR': { state: 'Uttar Pradesh', district: 'Kanpur Nagar', lat: 26.4499, lng: 80.3319 },
  'KHANNA': { state: 'Punjab', district: 'Ludhiana', lat: 30.7071, lng: 76.2168 },
  'KOCHI': { state: 'Kerala', district: 'Ernakulam', lat: 9.9312, lng: 76.2673 },
  'KOLAR': { state: 'Karnataka', district: 'Kolar', lat: 13.1367, lng: 78.1291 },
  'KOLKATA - RASHBEHARI': { state: 'West Bengal', district: 'Kolkata', lat: 22.5186, lng: 88.3512 },
  'KOLKATA - SHAKESPEARE SARANI': { state: 'West Bengal', district: 'Kolkata', lat: 22.5448, lng: 88.3577 },
  'KUMBAKONAM': { state: 'Tamil Nadu', district: 'Thanjavur', lat: 10.9602, lng: 79.3845 },
  'KURNOOL': { state: 'Andhra Pradesh', district: 'Kurnool', lat: 15.8281, lng: 78.0373 },
  'LUCKNOW - GOMTI NAGAR': { state: 'Uttar Pradesh', district: 'Lucknow', lat: 26.8500, lng: 80.9992 },
  'LUDHIANA': { state: 'Punjab', district: 'Ludhiana', lat: 30.9010, lng: 75.8573 },
  'MADURAI': { state: 'Tamil Nadu', district: 'Madurai', lat: 9.9252, lng: 78.1198 },
  'MUDHOL': { state: 'Karnataka', district: 'Bagalkot', lat: 16.3382, lng: 75.2847 },
  'MUMBAI - ANDHERI': { state: 'Maharashtra', district: 'Mumbai Suburban', lat: 19.1136, lng: 72.8697 },
  'MUMBAI - BOISAR': { state: 'Maharashtra', district: 'Palghar', lat: 19.8036, lng: 72.7562 },
  'MUZAFFARPUR - RAMNA': { state: 'Bihar', district: 'Muzaffarpur', lat: 26.1209, lng: 85.3647 },
  'MYSURU - CHAMRAJPURA': { state: 'Karnataka', district: 'Mysuru', lat: 12.3051, lng: 76.6450 },
  'NALBARI - ASSAM': { state: 'Assam', district: 'Nalbari', lat: 26.4447, lng: 91.4404 },
  'NANDED': { state: 'Maharashtra', district: 'Nanded', lat: 19.1383, lng: 77.3210 },
  'NANDURBAR': { state: 'Maharashtra', district: 'Nandurbar', lat: 21.3704, lng: 74.2405 },
  'NASHIK - SG LINK ROAD': { state: 'Maharashtra', district: 'Nashik', lat: 19.9975, lng: 73.7898 },
  'NAVI MUMBAI - PANVEL': { state: 'Maharashtra', district: 'Raigad', lat: 18.9894, lng: 73.1175 },
  'NAVI MUMBAI - PEN': { state: 'Maharashtra', district: 'Raigad', lat: 18.7354, lng: 73.0944 },
  'NAVI MUMBAI - VASHI': { state: 'Maharashtra', district: 'Thane', lat: 19.0770, lng: 72.9986 },
  'NAVSARI': { state: 'Gujarat', district: 'Navsari', lat: 20.9467, lng: 72.9520 },
  'NELLORE': { state: 'Andhra Pradesh', district: 'SPSR Nellore', lat: 14.4426, lng: 79.9865 },
  'NIZAMABAD': { state: 'Telangana', district: 'Nizamabad', lat: 18.6725, lng: 78.0941 },
  'NOIDA': { state: 'Uttar Pradesh', district: 'Gautam Buddha Nagar', lat: 28.5355, lng: 77.3910 },
  'NOKHA': { state: 'Rajasthan', district: 'Bikaner', lat: 27.6019, lng: 73.4241 },
  'ONGOLE': { state: 'Andhra Pradesh', district: 'Prakasam', lat: 15.5057, lng: 80.0499 },
  'PALANPUR': { state: 'Gujarat', district: 'Banaskantha', lat: 24.1724, lng: 72.4346 },
  'PANIPAT': { state: 'Haryana', district: 'Panipat', lat: 29.3909, lng: 76.9635 },
  'PATNA': { state: 'Bihar', district: 'Patna', lat: 25.5941, lng: 85.1376 },
  'PEENYA': { state: 'Karnataka', district: 'Bengaluru Urban', lat: 13.0285, lng: 77.5197 },
  'PRAYAGRAJ': { state: 'Uttar Pradesh', district: 'Prayagraj', lat: 25.4358, lng: 81.8463 },
  'PUNE': { state: 'Maharashtra', district: 'Pune', lat: 18.5204, lng: 73.8567 },
  'PUNE - WAGHOLI': { state: 'Maharashtra', district: 'Pune', lat: 18.5808, lng: 73.9787 },
  'RAJKOT': { state: 'Gujarat', district: 'Rajkot', lat: 22.3039, lng: 70.8022 },
  'RATANGARH': { state: 'Rajasthan', district: 'Churu', lat: 28.0772, lng: 74.6186 },
  'RATLAM': { state: 'Madhya Pradesh', district: 'Ratlam', lat: 23.3315, lng: 75.0367 },
  'SAGAR': { state: 'Madhya Pradesh', district: 'Sagar', lat: 23.8388, lng: 78.7378 },
  'SALEM': { state: 'Tamil Nadu', district: 'Salem', lat: 11.6643, lng: 78.1460 },
  'SAMBHALPUR': { state: 'Odisha', district: 'Sambalpur', lat: 21.4669, lng: 83.9812 },
  'SANGLI': { state: 'Maharashtra', district: 'Sangli', lat: 16.8524, lng: 74.5815 },
  'SECUNDERABAD- CLOCK TOWER': { state: 'Telangana', district: 'Hyderabad', lat: 17.4399, lng: 78.4983 },
  'SHIVAMOGA': { state: 'Karnataka', district: 'Shivamogga', lat: 13.9299, lng: 75.5681 },
  'SOLAN': { state: 'Himachal Pradesh', district: 'Solan', lat: 30.9045, lng: 77.0967 },
  'TANJORE': { state: 'Tamil Nadu', district: 'Thanjavur', lat: 10.7870, lng: 79.1378 },
  'THANE - AMBERNATH': { state: 'Maharashtra', district: 'Thane', lat: 19.2003, lng: 73.1895 },
  'TIRUVANNAMALAI': { state: 'Tamil Nadu', district: 'Tiruvannamalai', lat: 12.2253, lng: 79.0747 },
  'TUTICORIN': { state: 'Tamil Nadu', district: 'Thoothukudi', lat: 8.7642, lng: 78.1348 },
  'UJJAIN': { state: 'Madhya Pradesh', district: 'Ujjain', lat: 23.1765, lng: 75.7885 },
  'VALLIOOR': { state: 'Tamil Nadu', district: 'Tirunelveli', lat: 8.3792, lng: 77.6163 }
};

/**
 * Normalization map for Collections STATE labels.
 * 
 * In Collections raw data, 'Delhi NCR' appears as a State, containing districts from
 * Delhi (NCT), Uttar Pradesh, and Haryana.
 * 
 * This map normalizes districts inside Delhi NCR to their verified administrative states.
 */
export const DELHI_NCR_DISTRICT_MAPPING: Record<string, string> = {
  'GHAZIABAD': 'Uttar Pradesh',
  'GAUTAM BUDDHA NAGAR': 'Uttar Pradesh',
  'GURGAON': 'Haryana',
  'SOUTH DELHI': 'Delhi',
  'WEST DELHI': 'Delhi',
  'NORTH WEST DELHI': 'Delhi',
  'SHAHDARA': 'Delhi',
  'BULANDSHAHR': 'Uttar Pradesh'
};

/**
 * Canonical state name normalization for joins with GeoJSON boundaries.
 */
export const CANONICAL_STATES: Record<string, string> = {
  'delhi ncr': 'Delhi NCR',
  'delhi': 'Delhi',
  'maharashtra': 'Maharashtra',
  'telangana': 'Telangana',
  'tamil nadu': 'Tamil Nadu',
  'karnataka': 'Karnataka',
  'uttar pradesh': 'Uttar Pradesh',
  'punjab': 'Punjab',
  'andhra pradesh': 'Andhra Pradesh',
  'gujarat': 'Gujarat',
  'rajasthan': 'Rajasthan',
  'haryana': 'Haryana',
  'jharkhand': 'Jharkhand',
  'madhya pradesh': 'Madhya Pradesh',
  'kerala': 'Kerala',
  'tripura': 'Tripura',
  'chhattisgarh': 'Chhattisgarh',
  'himachal pradesh': 'Himachal Pradesh',
  'uttarakhand': 'Uttarakhand',
  'west bengal': 'West Bengal',
  'bihar': 'Bihar',
  'odisha': 'Odisha',
  'assam': 'Assam',
  'goa': 'Goa',
  'jammu and kashmir': 'Jammu and Kashmir',
  'ladakh': 'Ladakh'
};
