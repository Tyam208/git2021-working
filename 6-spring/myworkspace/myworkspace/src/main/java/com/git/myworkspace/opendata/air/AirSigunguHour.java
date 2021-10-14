package com.git.myworkspace.opendata.air;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Index;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(indexes = @Index(name = "idx_air_sigungu_hour_1", columnList = "sidoName, cityName"))
@IdClass(AirSigunguHourId.class)
public class AirSigunguHour {

	// ½Ã°£
	@Id
	private String dataTime;
	@Id
	@Column(columnDefinition = "varchar(20) collate \"ko_KR.utf8\"")
	private String sidoName;
	@Id
	@Column(columnDefinition = "varchar(20) collate \"ko_KR.utf8\"")
	private String cityName;
	// °ª
	private String pm10Value;
	private String pm25Value;
}