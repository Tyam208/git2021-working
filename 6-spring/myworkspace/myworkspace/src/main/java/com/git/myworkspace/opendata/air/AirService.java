package com.git.myworkspace.opendata.air;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

@Service
public class AirService {

	private final String SERVICE_KEY = "GGRNjTXnN6Z5V1LNrBjliOfhPHN%2FdDcbU4L61JogImtbwTnhWsFQRIcJik0ctilfleXarRvlcBM8Do4K6ys7Gw%3D%3D";

	private AirSigunguHourRepository repo;

	@Autowired
	public AirService(AirSigunguHourRepository repo) {
		this.repo = repo;
	}

	@Scheduled(fixedRate = 1000 * 60 * 60 * 1)
	public void requestAir() throws IOException {
		String[] sidoNames = { "서울" };
		for (String sidoName : sidoNames) {
			requestAirSiGunGuHour(sidoName);
		}
	}

	@SuppressWarnings("deprecation")
	public void requestAirSiGunGuHour(String sido) throws IOException {
		System.out.println(new Date().toLocaleString());

		StringBuilder builder = new StringBuilder();
		builder.append("http://apis.data.go.kr/B552584");
		builder.append("/ArpltnStatsSvc");
		builder.append("/getCtprvnMesureSidoLIst");
		builder.append("?sidoName=" + URLEncoder.encode(sido, "UTF-8"));
		builder.append("&searchCondition=HOUR");
		builder.append("&pageNo=1&numOfRows=100");
		builder.append("&serviceKey=" + SERVICE_KEY);

		System.out.println(builder.toString());

		URL url = new URL(builder.toString());

		HttpURLConnection con = (HttpURLConnection) url.openConnection();

		byte[] result = con.getInputStream().readAllBytes();

		String data = new String(result, "UTF-8");
		System.out.println(data);

		String json = XML.toJSONObject(data).toString(2);
		System.out.println(json);

		AirSigunguHourResponse response = new Gson().fromJson(json, AirSigunguHourResponse.class);
		System.out.println(response);

		List<AirSigunguHour> list = new ArrayList<AirSigunguHour>();
		for (AirSigunguHourResponse.Item item : response.getResponse().getBody().getItems().getItem()) {
			AirSigunguHour record = AirSigunguHour.builder().dataTime(item.getDataTime()).sidoName(item.getSidoName())
					.cityName(item.getCityName()).pm10Value(item.getPm10Value()).pm25Value(item.getPm25Value()).build();

			list.add(record);
		}

		repo.saveAll(list);
	}
}