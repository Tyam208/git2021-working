package exam;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class BankApplication {

	// Map �������� ������ Map ������ Ÿ��(Inteface)
	// = HashMap
	// = HashTable
	// = TreeMap
	//
	// �����ϴ� �ڷᱸ���� ���� ���� �޼��带 ȣ���ϴ���
	// �������� ó������� �ٸ�

	// ���¸�� Map ��ü
	// Map<ŰŸ��, ��Ÿ��> ������ = new HashMap<ŰŸ��, ��Ÿ��>();
	private static Map<String, Account> accounts = new HashMap<String, Account>();

	private static Scanner scanner = new Scanner(System.in);

	public static void main(String[] args) {
		boolean run = true;
		int balance = 0;
		while (run) {
			System.out.println("----------------------------------------------------------");
			System.out.println("1.���»��� | 2.���¸�� | 3.���� | 4.��� | 5.����");
			System.out.println("----------------------------------------------------------");
			System.out.print("����> ");

			int selectNo = scanner.nextInt();

			if (selectNo == 1) {
				System.out.println("--------------");
				System.out.println("���»���");
				System.out.println("--------------");
				createAccount();
			} else if (selectNo == 2) {
				System.out.println("--------------");
				System.out.println("���¸��");
				System.out.println("--------------");
				accountList();
			} else if (selectNo == 3) {
				System.out.println("--------------");
				System.out.println("����");
				System.out.println("--------------");
				deposit();
			} else if (selectNo == 4) {
				System.out.println("--------------");
				System.out.println("���");
				System.out.println("--------------");
				withdraw();
			} else if (selectNo == 5) {
				System.out.println("--------------");
				System.out.println("���¸��");
				System.out.println("--------------");
				run = false;
			}
		}
		System.out.println("���α׷� ����");
	}

	// ���»����ϱ�(�����߰��ϱ�)
	private static void createAccount() {

		System.out.println("���¹�ȣ:");
		String ano = scanner.next();
		System.out.println("������:");
		String owner = scanner.next();
		System.out.println("�ʱ��Աݾ�:");
		int balance = scanner.nextInt();

		System.out.print("���:���°� �����Ǿ����ϴ�.");
		accounts.put(ano, new Account(ano, owner, balance));
	}

	// ���¸�Ϻ���
	private static void accountList() {
		for (String ano : accounts.keySet()) {
			String owner = accounts.get(ano).getOwner();
			int balance = accounts.get(ano).getBalance();

			System.out.println(ano + " " + owner + "  " + balance);
		}
	}

	// �����ϱ�(�ʵ尪����)
	private static void deposit() {
		System.out.println("���¹�ȣ:");
		String ano = scanner.next();
		if (accounts.containsKey(ano)) {
			System.out.println("���ݾ�:");
			int money = scanner.nextInt();
			Account account = accounts.get(ano);
			account.setBalance(account.getBalance() + money);
			System.out.print("���:������ �����Ǿ����ϴ�.");
		} else {
			System.out.print("���:������ ���еǾ����ϴ�.");
			return;
		}
	}

	// ����ϱ�(�ʵ尪����)
	private static void withdraw() {
		System.out.println("���¹�ȣ:");
		String ano = scanner.next();
		if (accounts.containsKey(ano)) {
			System.out.println("��ݾ�:");
			int money = scanner.nextInt();
			Account account = accounts.get(ano);
			account.setBalance(account.getBalance() - money);
			if (money < account.getBalance()) {
				System.out.print("���:����� �����Ǿ����ϴ�.");
			} else if (0 > account.getBalance()) {
				System.out.print("���:�ܾ��� �����մϴ�.");
				return;
			}
		}
	}
}
