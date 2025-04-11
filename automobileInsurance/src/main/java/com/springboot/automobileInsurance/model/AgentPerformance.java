package com.springboot.automobileInsurance.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "agent_performance")
public class AgentPerformance{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private int numberOfClaimsHandled;
	
    private double averageResolutionTime;
    
    private double customerFeedbackRating;
    
    private int totalPayout;
    
    private int claimApprovalRate;
    
    private int reopenedClaims;
    
    private int agentExperience;


    
    @OneToOne
    private Agent agent;
    

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getNumberOfClaimsHandled() {
		return numberOfClaimsHandled;
	}

	public void setNumberOfClaimsHandled(int numberOfClaimsHandled) {
		this.numberOfClaimsHandled = numberOfClaimsHandled;
	}

	public double getAverageResolutionTime() {
		return averageResolutionTime;
	}

	public void setAverageResolutionTime(double averageResolutionTime) {
		this.averageResolutionTime = averageResolutionTime;
	}

	public double getCustomerFeedbackRating() {
		return customerFeedbackRating;
	}

	public void setCustomerFeedbackRating(double customerFeedbackRating) {
		this.customerFeedbackRating = customerFeedbackRating;
	}

	public int getTotalPayout() {
		return totalPayout;
	}

	public void setTotalPayout(int totalPayout) {
		this.totalPayout = totalPayout;
	}

	public int getClaimApprovalRate() {
		return claimApprovalRate;
	}

	public void setClaimApprovalRate(int claimApprovalRate) {
		this.claimApprovalRate = claimApprovalRate;
	}

	public int getReopenedClaims() {
		return reopenedClaims;
	}

	public void setReopenedClaims(int reopenedClaims) {
		this.reopenedClaims = reopenedClaims;
	}

	public int getAgentExperience() {
		return agentExperience;
	}

	public void setAgentExperience(int agentExperience) {
		this.agentExperience = agentExperience;
	}

	public Agent getAgent() {
		return agent;
	}

	public void setAgent(Agent agent) {
		this.agent = agent;
	}

	

	
    
}