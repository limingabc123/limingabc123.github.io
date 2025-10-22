"""
测试运行脚本
运行模型小助理项目的所有测试
"""

import unittest
import sys
import os
import subprocess


def run_unit_tests():
    """运行单元测试"""
    print("=" * 60)
    print("运行单元测试...")
    print("=" * 60)
    
    # 导入并运行单元测试
    from test_model_api import TestModelAPI, TestProxyFunctionality
    
    # 创建测试套件
    unit_test_suite = unittest.TestSuite()
    unit_test_suite.addTest(unittest.makeSuite(TestModelAPI))
    unit_test_suite.addTest(unittest.makeSuite(TestProxyFunctionality))
    
    # 运行测试
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(unit_test_suite)
    
    return result.wasSuccessful()


def run_integration_tests():
    """运行集成测试"""
    print("\n" + "=" * 60)
    print("运行集成测试...")
    print("=" * 60)
    
    # 导入并运行集成测试
    from test_integration import TestSystemIntegration, TestConfiguration, TestPerformance
    
    # 创建测试套件
    integration_test_suite = unittest.TestSuite()
    integration_test_suite.addTest(unittest.makeSuite(TestSystemIntegration))
    integration_test_suite.addTest(unittest.makeSuite(TestConfiguration))
    integration_test_suite.addTest(unittest.makeSuite(TestPerformance))
    
    # 运行测试
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(integration_test_suite)
    
    return result.wasSuccessful()


def run_all_tests():
    """运行所有测试"""
    print("开始运行模型小助理项目测试套件")
    print("=" * 60)
    
    # 运行单元测试
    unit_success = run_unit_tests()
    
    # 运行集成测试
    integration_success = run_integration_tests()
    
    # 输出测试结果摘要
    print("\n" + "=" * 60)
    print("测试结果摘要")
    print("=" * 60)
    
    if unit_success and integration_success:
        print("✅ 所有测试通过！")
        return True
    else:
        print("❌ 部分测试失败：")
        if not unit_success:
            print("   - 单元测试失败")
        if not integration_success:
            print("   - 集成测试失败")
        return False


def run_specific_test(test_file, test_class=None, test_method=None):
    """运行特定的测试"""
    print(f"运行特定测试: {test_file}")
    
    if test_class and test_method:
        # 运行特定的测试方法
        test_name = f"{test_file}.{test_class}.{test_method}"
        result = subprocess.run([
            sys.executable, "-m", "unittest", test_name
        ], capture_output=True, text=True)
    elif test_class:
        # 运行特定的测试类
        test_name = f"{test_file}.{test_class}"
        result = subprocess.run([
            sys.executable, "-m", "unittest", test_name
        ], capture_output=True, text=True)
    else:
        # 运行整个测试文件
        result = subprocess.run([
            sys.executable, "-m", "unittest", test_file
        ], capture_output=True, text=True)
    
    print(result.stdout)
    if result.stderr:
        print("错误:", result.stderr)
    
    return result.returncode == 0


def show_test_coverage():
    """显示测试覆盖信息"""
    print("\n" + "=" * 60)
    print("测试覆盖范围")
    print("=" * 60)
    
    coverage_info = {
        "单元测试": [
            "✅ API端点可用性测试",
            "✅ 聊天完成结构测试", 
            "✅ 错误处理测试",
            "✅ 模型选择测试",
            "✅ 代理初始化测试",
            "✅ 请求转发测试"
        ],
        "集成测试": [
            "✅ 服务健康检查测试",
            "✅ 完整聊天工作流程测试",
            "✅ 模型列表功能测试",
            "✅ 错误场景测试",
            "✅ 配置验证测试",
            "✅ 环境变量配置测试",
            "✅ 响应时间测试",
            "✅ 并发请求处理测试"
        ],
        "性能测试": [
            "✅ 响应时间监控",
            "✅ 并发处理能力",
            "✅ 错误恢复能力"
        ]
    }
    
    for category, tests in coverage_info.items():
        print(f"\n{category}:")
        for test in tests:
            print(f"  {test}")


def main():
    """主函数"""
    import argparse
    
    parser = argparse.ArgumentParser(description='运行模型小助理项目测试')
    parser.add_argument('--unit', action='store_true', help='只运行单元测试')
    parser.add_argument('--integration', action='store_true', help='只运行集成测试')
    parser.add_argument('--specific', type=str, help='运行特定测试文件')
    parser.add_argument('--class', type=str, dest='test_class', help='运行特定测试类')
    parser.add_argument('--method', type=str, help='运行特定测试方法')
    parser.add_argument('--coverage', action='store_true', help='显示测试覆盖信息')
    
    args = parser.parse_args()
    
    if args.coverage:
        show_test_coverage()
        return
    
    if args.specific:
        success = run_specific_test(args.specific, args.test_class, args.method)
        sys.exit(0 if success else 1)
    elif args.unit:
        success = run_unit_tests()
        sys.exit(0 if success else 1)
    elif args.integration:
        success = run_integration_tests()
        sys.exit(0 if success else 1)
    else:
        # 默认运行所有测试
        success = run_all_tests()
        sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
