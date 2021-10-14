package com.git.myworkspace.opendata.covid;

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
public class CovidService {

	private final String SERVICE_KEY = "GGRNjTXnN6Z5V1LNrBjliOfhPHN%2FdDcbU4L61JogImtbwTnhWsFQRIcJik0ctilfleXarRvlcBM8Do4K6ys7Gw%3D%3D";

	private CovidSidoDailyRepository repo;

	@Autowired
	public CovidService(CovidSidoDailyRepository repo) {
		this.repo = repo;
	}

	// @Scheduled(fixedRate = 1000 * 60 * 60 * 1)
	@Scheduled(cron = "0 0 14 * * *")
	public void requestCovid() throws IOException {
		String[] gubuns = { "서울" };
		for (String gubun : gubuns) {
			requestCovidSidoDaily(gubun);
		}
	}

	@SuppressWarnings("deprecation")
	public void requestCovidSidoDaily(String sido) throws IOException {
		System.out.println(new Date().toLocaleString());

		StringBuilder builder = new StringBuilder();
		builder.append("http://openapi.data.go.kr/openapi");
		builder.append("/service/rest/Covid19");
		builder.append("/getCovid19SidoInfStateJson");
		builder.append("?gubun=" + URLEncoder.encode(sido, "UTF-8"));
		builder.append("&stdDay");
		builder.append("&overFlowCnt");
		builder.append("&localOccCnt");
		builder.append("&pageNo=1&numOfRows=14");
		builder.append("&startCreateDt=20210925&endCreateDt=20210925");
		builder.append("&serviceKey=" + SERVICE_KEY);

		System.out.println(builder.toString());

		URL url = new URL(builder.toString());

		HttpURLConnection con = (HttpURLConnection) url.openConnection();

		byte[] result = con.getInputStream().readAllBytes();

		String data = new String(result, "UTF-8");
		System.out.println(data);

		String json = XML.toJSONObject(data).toString(2);
		System.out.println(json);

		CovidSidoDailyResponse response = new Gson().fromJson(json, CovidSidoDailyResponse.class);
		System.out.println(response);

		List<CovidSidoDaily> list = new ArrayList<CovidSidoDaily>();
		for (CovidSidoDailyResponse.Item item : response.getResponse().getBody().getItems().getItem()) {
			CovidSidoDaily record = CovidSidoDaily.builder().stdDay(item.getStdDay()).gubun(item.getGubun())
					.overFlowCnt(item.getOverFlowCnt()).localOccCnt(item.getLocalOccCnt()).build();

			list.add(record);
		}

		repo.saveAll(list);
	}

}
