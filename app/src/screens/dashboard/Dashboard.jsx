import React from 'react';
import { View } from 'react-native';
import DashboardTemplate from '@components/templates/DashboardTemplate';
import DashboardHeader from '@components/molecules/DashboardHeader';
import DashboardList from '@components/molecules/DashboardList';
import ResumeReadingModal from '@components/molecules/ResumeReadingModal';
import ResumeReadingBanner from '@components/molecules/ResumeReadingBanner';
import SearchInput from '@components/atoms/SearchInput';
import AppText from '@components/atoms/AppText';
import { shlokas_title } from '@utils/shlokas/shlokas_title';
import { colors } from '@utils/theme';
import useDashboard from './useDashboard';
import styles from './styles';

const Dashboard = ({ navigation }) => {
  const {
    searchQuery,
    setSearchQuery,
    filteredData,
    lastReadData,
    showResumeModal,
    handleItemPress,
    handleClearSearch,
    handleContinueReading,
    handleDismissResume,
  } = useDashboard({ navigation });

  return (
    <DashboardTemplate>
      <View style={styles.container}>
        <DashboardHeader
          title="શિક્ષાપત્રી"
          subtitle="સર્વજીવહિતાવહ પાવન ધર્મશાસ્ત્ર"
          totalChapters={shlokas_title.length}
          totalShlokas={212}
        />

        {/* Live Search Bar */}
        <View style={styles.searchContainer}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="અધ્યાય અથવા શ્લોક નંબર શોધો (દા.ત. ૧૫)..."
            onClear={handleClearSearch}
          />
        </View>

        {/* Quick Resume Reading Banner */}
        {lastReadData && !searchQuery.trim() && (
          <ResumeReadingBanner
            shlokaId={lastReadData.shlokaId}
            chapterTitle={lastReadData.chapterTitle}
            isDhyan={lastReadData.isDhyan}
            onPress={handleContinueReading}
          />
        )}

        {/* Chapters Grid List */}
        <DashboardList
          data={filteredData}
          onItemPress={handleItemPress}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AppText variant="caption" center color={colors.textMuted} style={styles.emptyText}>
                કોઈ પરિણામ મળ્યા નથી.
              </AppText>
            </View>
          }
        />

        {/* Continue Reading Resume Prompt */}
        {lastReadData && (
          <ResumeReadingModal
            visible={showResumeModal}
            shlokaId={lastReadData.shlokaId}
            chapterTitle={lastReadData.chapterTitle}
            isDhyan={lastReadData.isDhyan}
            onContinue={handleContinueReading}
            onDismiss={handleDismissResume}
          />
        )}
      </View>
    </DashboardTemplate>
  );
};

export default Dashboard;
